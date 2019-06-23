import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { EntityService } from '~core/entities/entity-service';
import { Product } from '~core/entities/product/product';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { defaultCatch } from '../../utils/helpers';

const allProducts = gql`
{
	allProducts {
		_id,
		code,
		name,
		productType,
		actualPrice,
		paymentType,
		numberOfParcels,
		valueOfParcel,
		colors,
		sizes
	}
}`;

const getProduct = gql`
  query product($id: ID) {
    oneProduct(id: $id) {
      _id
      code
      name
      productType
      photosURL
      actualPrice
      exPrice
      paymentType
      numberOfParcels
	  valueOfParcel
	  colors
	  sizes
      updatedDate
    }
  }
`;

const addProduct = gql`
  mutation addProduct(
  	$code: Int!,
    $name: String!,
    $productType: String!,
    $photosURL: [String!]!,
    $actualPrice: Float!,
    $exPrice: Float,
    $paymentType: [String!]!,
    $numberOfParcels: Int,
	$valueOfParcel: Float!,
	$colors: [String!]!,
	$sizes: [String]) {
      addProduct(
      	code: $code,
        name: $name,
        productType: $productType,
        photosURL: $photosURL,
        actualPrice: $actualPrice,
        exPrice: $exPrice,
        paymentType: $paymentType,
        numberOfParcels: $numberOfParcels,
				valueOfParcel: $valueOfParcel,
				colors: $colors,
				sizes: $sizes) {
        _id
        }
    }
`;

const updateProduct = gql`
  mutation updateProduct(
    $id: ID!
    $name: String!,
    $productType: String!,
    $photosURL: [String!]!,
    $actualPrice: Float!,
    $exPrice: Float,
    $paymentType: [String!]!,
    $numberOfParcels: Int,
	$valueOfParcel: Float!,
	$colors: [String!]!,
	$sizes: [String]) {
      updateProduct(
        id: $id,
        name: $name,
        productType: $productType,
        photosURL: $photosURL,
        actualPrice: $actualPrice,
        exPrice: $exPrice,
        paymentType: $paymentType,
        numberOfParcels: $numberOfParcels,
				valueOfParcel: $valueOfParcel,
				colors: $colors,
				sizes: $sizes) {
          updatedDate
        }
    }
`;

const deleteProduct = gql`
  mutation removeProduct($id: ID!) {
    removeProduct(id: $id) {
      _id
    }
  }
`;

const entityQueries = {
	all: allProducts,
	one: getProduct
};

const entityMutations = {
	add: addProduct,
	update: updateProduct,
	delete: deleteProduct,
};

@Injectable({
	providedIn: 'root',
})
export class ProductService extends EntityService<Product> {

	constructor(private _apollo: Apollo, private http: HttpClient) {
		super(_apollo, entityQueries, entityMutations);
	}

	addPhotos(files: Blob[]) {
		const formData = new FormData();

		for (const file of files) {
			formData.append('images', file);
		}

		return this.http.post(`${this.baseURL}/images-upload`, formData).pipe(defaultCatch());
	}

	deletePhotos(photosUrl: string[]) {
		const keys = photosUrl.map(link => ({ 'Key': link.slice(link.lastIndexOf('/')).replace('/', '') }));
		const body = {
			keys: keys
		};

		return this.http.post(`${this.baseURL}/images-delete`, body).pipe(defaultCatch());
	}
}
