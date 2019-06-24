import { Apollo, QueryRef } from 'apollo-angular';
import { defaultCatch } from '../utils/helpers';
import { BASE_URL } from '../utils/constants';

export class EntityService<T> {
	public baseURL = BASE_URL;

	constructor(
		protected apollo: Apollo,
		protected entityQueries?,
		protected entityMutations?,
	) {
		this.entityQueries = entityQueries;
		this.entityMutations = entityMutations;
	}

	findAll(): QueryRef<T> {
		return this.apollo.watchQuery({ query: this.entityQueries.all, fetchPolicy: 'network-only' });
	}

	findAllPaginate(listParams = {}): QueryRef<T> {
		return this.apollo.watchQuery({ query: this.entityQueries.allPaginate, variables: { pagination: listParams }, fetchPolicy: 'network-only' });
	}

	findOne(entityId: string): QueryRef<T> {
		return this.apollo.watchQuery({ query: this.entityQueries.one, variables: { id: entityId }, fetchPolicy: 'network-only' });
	}

	insert(body = {}) {
		return this.apollo.mutate({ mutation: this.entityMutations.add, variables: body }).pipe(defaultCatch());
	}

	update(entityId: string, body = {}) {
		return this.apollo.mutate({ mutation: this.entityMutations.update, variables: { ...{ id: entityId }, ...body } }).pipe(defaultCatch());
	}

	delete(entityId: string) {
		return this.apollo.mutate({ mutation: this.entityMutations.delete, variables: { id: entityId } }).pipe(defaultCatch());
	}
}
