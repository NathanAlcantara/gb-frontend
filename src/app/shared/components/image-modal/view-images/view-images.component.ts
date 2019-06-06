import { AfterViewInit, Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { CdkDrag, CdkDragMove, CdkDropList, CdkDropListGroup, moveItemInArray } from '@angular/cdk/drag-drop';
import { ViewportRuler } from '@angular/cdk/overlay';
import { AWS_BUCKET_PHOTOS } from '~core/utils/constants';

@Component({
	selector: 'n-view-images',
	templateUrl: './view-images.component.html',
	styleUrls: ['./view-images.component.scss']
})
export class ViewImagesComponent implements AfterViewInit {

	@Input()
	images: any;

	@Output()
	onCancel = new EventEmitter();
	@Output()
	onReorderImages = new EventEmitter();

	@ViewChild(CdkDropListGroup) listGroup: CdkDropListGroup<CdkDropList>;
	@ViewChild(CdkDropList) placeholder: CdkDropList;

	target: CdkDropList;
	targetIndex: number;
	source: CdkDropList;
	sourceIndex: number;
	activeContainer: any;

	private deletedImages: string[] = [];
	private indexDeletedImages: string[] = [];

	constructor(private viewportRuler: ViewportRuler) {
		this.target = null;
		this.source = null;
	}

	ngAfterViewInit() {
		const phElement = this.placeholder.element.nativeElement;

		phElement.style.display = 'none';
		phElement.parentElement.removeChild(phElement);
	}

	deleteImage(value: any) {
		if (!value.includes(AWS_BUCKET_PHOTOS)) this.indexDeletedImages.push(this.images.indexOf(value));
		this.images.splice(this.images.indexOf(value), 1);
		this.deletedImages.push(value);
	}

	confirmChanges() {
		this.onReorderImages.emit({ images: this.images, deletedImages: this.deletedImages, indexDeletedImages: this.indexDeletedImages });
	}

	dragMoved(e: CdkDragMove) {
		const point = this.getPointerPositionOnPage(e.event);

		this.listGroup._items.forEach(dropList => {
			if (__isInsideDropListClientRect(dropList, point.x, point.y)) {
				this.activeContainer = dropList;
				return;
			}
		});
	}

	dropListDropped() {
		if (!this.target) {
			return;
		}

		const phElement = this.placeholder.element.nativeElement;
		const parent = phElement.parentElement;

		phElement.style.display = 'none';

		parent.removeChild(phElement);
		parent.appendChild(phElement);
		parent.insertBefore(this.source.element.nativeElement, parent.children[this.sourceIndex]);

		this.target = null;
		this.source = null;

		if (this.sourceIndex != this.targetIndex) {
			moveItemInArray(this.images, this.sourceIndex, this.targetIndex);
		}
	}

	dropListEnterPredicate = (drag: CdkDrag, drop: CdkDropList) => {
		if (drop == this.placeholder) {
			return true;
		}

		if (drop != this.activeContainer) {
			return false;
		}

		const phElement = this.placeholder.element.nativeElement;
		const sourceElement = drag.dropContainer.element.nativeElement;
		const dropElement = drop.element.nativeElement;

		const dragIndex = __indexOf(dropElement.parentElement.children, (this.source ? phElement : sourceElement));
		const dropIndex = __indexOf(dropElement.parentElement.children, dropElement);

		if (!this.source) {
			this.sourceIndex = dragIndex;
			this.source = drag.dropContainer;

			phElement.style.width = sourceElement.clientWidth + 'px';
			phElement.style.height = sourceElement.clientHeight + 'px';

			sourceElement.parentElement.removeChild(sourceElement);
		}

		this.targetIndex = dropIndex;
		this.target = drop;

		phElement.style.display = '';
		dropElement.parentElement.insertBefore(phElement, (dropIndex > dragIndex
			? dropElement.nextSibling : dropElement));

		this.placeholder.enter(drag, drag.element.nativeElement.offsetLeft, drag.element.nativeElement.offsetTop);
		return false;
	};

	/** Determines the point of the page that was touched by the user. */
	getPointerPositionOnPage(event: MouseEvent | TouchEvent) {
		// `touches` will be empty for start/end events so we have to fall back to `changedTouches`.
		const point = __isTouchEvent(event) ? (event.touches[0] || event.changedTouches[0]) : event;
		const scrollPosition = this.viewportRuler.getViewportScrollPosition();

		return {
			x: point.pageX - scrollPosition.left,
			y: point.pageY - scrollPosition.top
		};
	}
}

function __indexOf(collection: any, node: any) {
	return Array.prototype.indexOf.call(collection, node);
}

/** Determines whether an event is a touch event. */
function __isTouchEvent(event: MouseEvent | TouchEvent): event is TouchEvent {
	return event.type.startsWith('touch');
}

function __isInsideDropListClientRect(dropList: CdkDropList, x: number, y: number) {
	const { top, bottom, left, right } = dropList.element.nativeElement.getBoundingClientRect();
	return y >= top && y <= bottom && x >= left && x <= right;
}
