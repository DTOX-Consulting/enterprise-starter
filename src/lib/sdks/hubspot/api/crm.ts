/* eslint-disable max-lines */
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

import { ContentType, HttpClient, type RequestParams } from '@/lib/sdks/hubspot/api/http-client';

export class Crm<SecurityDataType = unknown> extends HttpClient<SecurityDataType> {
  /**
   * Associate all pairs of objects identified in the request body.
   *
   * @tags Associations V3 API > Batch
   * @name V3AssociationsBatchCreateCreate
   * @summary Create a batch of associations
   * @request POST:/crm/v3/associations/{fromObjectType}/{toObjectType}/batch/create
   * @secure
   */
  v3AssociationsBatchCreateCreate = async (
    fromObjectType: string,
    toObjectType: string,
    data: object,
    params: RequestParams = {}
  ) =>
    this.request<object, string>({
      path: `/crm/v3/associations/${fromObjectType}/${toObjectType}/batch/create`,
      method: 'POST',
      body: data,
      secure: true,
      type: ContentType.Json,
      format: 'json',
      ...params
    });
  /**
   *  Get the IDs of all `{toObjectType}` objects associated with those specified in the request body.
   *
   * @tags Associations V3 API > Batch
   * @name V3AssociationsBatchReadCreate
   * @summary Read a batch of associations
   * @request POST:/crm/v3/associations/{fromObjectType}/{toObjectType}/batch/read
   * @secure
   */
  v3AssociationsBatchReadCreate = async (
    fromObjectType: string,
    toObjectType: string,
    data: object,
    params: RequestParams = {}
  ) =>
    this.request<object, string>({
      path: `/crm/v3/associations/${fromObjectType}/${toObjectType}/batch/read`,
      method: 'POST',
      body: data,
      secure: true,
      type: ContentType.Json,
      format: 'json',
      ...params
    });
  /**
   *  Remove the associations between all pairs of objects identified in the request body.
   *
   * @tags Associations V3 API > Batch
   * @name V3AssociationsBatchArchiveCreate
   * @summary Archive a batch of associations
   * @request POST:/crm/v3/associations/{fromObjectType}/{toObjectType}/batch/archive
   * @secure
   */
  v3AssociationsBatchArchiveCreate = async (
    fromObjectType: string,
    toObjectType: string,
    data: object,
    params: RequestParams = {}
  ) =>
    this.request<string, string>({
      path: `/crm/v3/associations/${fromObjectType}/${toObjectType}/batch/archive`,
      method: 'POST',
      body: data,
      secure: true,
      type: ContentType.Json,
      ...params
    });
  /**
   *  List all the valid association types available between two object types
   *
   * @tags Associations V3 Schema API > Types
   * @name V3AssociationsTypesDetail
   * @summary List association types
   * @request GET:/crm/v3/associations/{fromObjectType}/{toObjectType}/types
   * @secure
   */
  v3AssociationsTypesDetail = async (
    fromObjectType: string,
    toObjectType: string,
    params: RequestParams = {}
  ) =>
    this.request<object, string>({
      path: `/crm/v3/associations/${fromObjectType}/${toObjectType}/types`,
      method: 'GET',
      secure: true,
      format: 'json',
      ...params
    });
  /**
   *  Batch delete specific association labels for objects. Deleting an unlabeled association will also delete all labeled associations between those two objects
   *
   * @tags Flexible Associations V4 API > Batch
   * @name V4AssociationsBatchLabelsArchiveCreate
   * @summary Delete Specific Labels
   * @request POST:/crm/v4/associations/{fromObjectType}/{toObjectType}/batch/labels/archive
   * @secure
   */
  v4AssociationsBatchLabelsArchiveCreate = async (
    fromObjectType: string,
    toObjectType: string,
    data: object,
    params: RequestParams = {}
  ) =>
    this.request<string, string>({
      path: `/crm/v4/associations/${fromObjectType}/${toObjectType}/batch/labels/archive`,
      method: 'POST',
      body: data,
      secure: true,
      type: ContentType.Json,
      ...params
    });
  /**
   *  Batch read associations for objects to specific object type. The 'after' field in a returned paging object  can be added alongside the 'id' to retrieve the next page of associations from that objectId. The 'link' field is deprecated and should be ignored.
   *
   * @tags Flexible Associations V4 API > Batch
   * @name V4AssociationsBatchReadCreate
   * @summary Read
   * @request POST:/crm/v4/associations/{fromObjectType}/{toObjectType}/batch/read
   * @secure
   */
  v4AssociationsBatchReadCreate = async (
    fromObjectType: string,
    toObjectType: string,
    data: object,
    params: RequestParams = {}
  ) =>
    this.request<object, string>({
      path: `/crm/v4/associations/${fromObjectType}/${toObjectType}/batch/read`,
      method: 'POST',
      body: data,
      secure: true,
      type: ContentType.Json,
      format: 'json',
      ...params
    });
  /**
   *  Batch create associations for objects
   *
   * @tags Flexible Associations V4 API > Batch
   * @name V4AssociationsBatchCreateCreate
   * @summary Create
   * @request POST:/crm/v4/associations/{fromObjectType}/{toObjectType}/batch/create
   * @secure
   */
  v4AssociationsBatchCreateCreate = async (
    fromObjectType: string,
    toObjectType: string,
    data: object,
    params: RequestParams = {}
  ) =>
    this.request<object, string>({
      path: `/crm/v4/associations/${fromObjectType}/${toObjectType}/batch/create`,
      method: 'POST',
      body: data,
      secure: true,
      type: ContentType.Json,
      format: 'json',
      ...params
    });
  /**
   *  Batch delete associations for objects
   *
   * @tags Flexible Associations V4 API > Batch
   * @name V4AssociationsBatchArchiveCreate
   * @summary Delete
   * @request POST:/crm/v4/associations/{fromObjectType}/{toObjectType}/batch/archive
   * @secure
   */
  v4AssociationsBatchArchiveCreate = async (
    fromObjectType: string,
    toObjectType: string,
    data: object,
    params: RequestParams = {}
  ) =>
    this.request<string, string>({
      path: `/crm/v4/associations/${fromObjectType}/${toObjectType}/batch/archive`,
      method: 'POST',
      body: data,
      secure: true,
      type: ContentType.Json,
      ...params
    });
  /**
   *  Create the default (most generic) association type between two object types
   *
   * @tags Flexible Associations V4 API > Batch
   * @name V4AssociationsBatchAssociateDefaultCreate
   * @summary  Create Default Associations
   * @request POST:/crm/v4/associations/{fromObjectType}/{toObjectType}/batch/associate/default
   * @secure
   */
  v4AssociationsBatchAssociateDefaultCreate = async (
    fromObjectType: string,
    toObjectType: string,
    data: object,
    params: RequestParams = {}
  ) =>
    this.request<object, string>({
      path: `/crm/v4/associations/${fromObjectType}/${toObjectType}/batch/associate/default`,
      method: 'POST',
      body: data,
      secure: true,
      type: ContentType.Json,
      format: 'json',
      ...params
    });
  /**
   *  Set association labels between two records.
   *
   * @tags Flexible Associations V4 API > Associations
   * @name V4ObjectsAssociationsUpdate
   * @summary Create
   * @request PUT:/crm/v4/objects/{objectType}/{objectId}/associations/{toObjectType}/{toObjectId}
   * @secure
   */
  // eslint-disable-next-line max-params
  v4ObjectsAssociationsUpdate = async (
    objectType: string,
    objectId: string,
    toObjectType: string,
    toObjectId: string,
    data: object,
    params: RequestParams = {}
  ) =>
    this.request<object, string>({
      path: `/crm/v4/objects/${objectType}/${objectId}/associations/${toObjectType}/${toObjectId}`,
      method: 'PUT',
      body: data,
      secure: true,
      type: ContentType.Json,
      format: 'json',
      ...params
    });
  /**
   *  deletes all associations between two records.
   *
   * @tags Flexible Associations V4 API > Associations
   * @name V4ObjectsAssociationsDelete
   * @summary Delete
   * @request DELETE:/crm/v4/objects/{objectType}/{objectId}/associations/{toObjectType}/{toObjectId}
   * @secure
   */
  v4ObjectsAssociationsDelete = async (
    objectType: string,
    objectId: string,
    toObjectType: string,
    toObjectId: string,
    params: RequestParams = {}
  ) =>
    this.request<string, string>({
      path: `/crm/v4/objects/${objectType}/${objectId}/associations/${toObjectType}/${toObjectId}`,
      method: 'DELETE',
      secure: true,
      ...params
    });
  /**
   *  Create the default (most generic) association type between two object types
   *
   * @tags Flexible Associations V4 API > Associations
   * @name V4ObjectsAssociationsDefaultUpdate
   * @summary Create Default
   * @request PUT:/crm/v4/objects/{fromObjectType}/{fromObjectId}/associations/default/{toObjectType}/{toObjectId}
   * @secure
   */
  // eslint-disable-next-line max-params
  v4ObjectsAssociationsDefaultUpdate = async (
    fromObjectType: string,
    fromObjectId: string,
    toObjectType: string,
    toObjectId: string,
    data: any,
    params: RequestParams = {}
  ) =>
    this.request<object, string>({
      path: `/crm/v4/objects/${fromObjectType}/${fromObjectId}/associations/default/${toObjectType}/${toObjectId}`,
      method: 'PUT',
      body: data,
      secure: true,
      format: 'json',
      ...params
    });
  /**
   *  List all associations of an object by object type. Limit 1000 per call.
   *
   * @tags Flexible Associations V4 API > Associations
   * @name V4ObjectsAssociationsDetail
   * @summary List
   * @request GET:/crm/v4/objects/{objectType}/{objectId}/associations/{toObjectType}
   * @secure
   */
  v4ObjectsAssociationsDetail = async (
    objectType: string,
    objectId: string,
    toObjectType: string,
    query?: {
      /**
       * The paging cursor token of the last successfully read resource will be returned as the `paging.next.after` JSON property of a paged response containing more results.
       *
       * @example "<string>"
       */
      after?: string;
      /**
       * The maximum number of results to display per page.
       *
       * @example "500"
       */
      limit?: number;
    },
    params: RequestParams = {}
  ) =>
    this.request<object, string>({
      path: `/crm/v4/objects/${objectType}/${objectId}/associations/${toObjectType}`,
      method: 'GET',
      query,
      secure: true,
      format: 'json',
      ...params
    });
  /**
   *  Returns all association types between two object types
   *
   * @tags Associations V4 Schema API > Definitions
   * @name V4AssociationsLabelsDetail
   * @summary Read
   * @request GET:/crm/v4/associations/{fromObjectType}/{toObjectType}/labels
   * @secure
   */
  v4AssociationsLabelsDetail = async (
    fromObjectType: string,
    toObjectType: string,
    params: RequestParams = {}
  ) =>
    this.request<object, string>({
      path: `/crm/v4/associations/${fromObjectType}/${toObjectType}/labels`,
      method: 'GET',
      secure: true,
      format: 'json',
      ...params
    });
  /**
   *  Update a user defined association definition
   *
   * @tags Associations V4 Schema API > Definitions
   * @name V4AssociationsLabelsUpdate
   * @summary Update
   * @request PUT:/crm/v4/associations/{fromObjectType}/{toObjectType}/labels
   * @secure
   */
  v4AssociationsLabelsUpdate = async (
    fromObjectType: string,
    toObjectType: string,
    data: object,
    params: RequestParams = {}
  ) =>
    this.request<string, string>({
      path: `/crm/v4/associations/${fromObjectType}/${toObjectType}/labels`,
      method: 'PUT',
      body: data,
      secure: true,
      type: ContentType.Json,
      ...params
    });
  /**
   *  Create a user defined association definition
   *
   * @tags Associations V4 Schema API > Definitions
   * @name V4AssociationsLabelsCreate
   * @summary Create
   * @request POST:/crm/v4/associations/{fromObjectType}/{toObjectType}/labels
   * @secure
   */
  v4AssociationsLabelsCreate = async (
    fromObjectType: string,
    toObjectType: string,
    data: object,
    params: RequestParams = {}
  ) =>
    this.request<object, string>({
      path: `/crm/v4/associations/${fromObjectType}/${toObjectType}/labels`,
      method: 'POST',
      body: data,
      secure: true,
      type: ContentType.Json,
      format: 'json',
      ...params
    });
  /**
   *  Deletes an association definition
   *
   * @tags Associations V4 Schema API > Definitions
   * @name V4AssociationsLabelsDelete
   * @summary Delete
   * @request DELETE:/crm/v4/associations/{fromObjectType}/{toObjectType}/labels/{associationTypeId}
   * @secure
   */
  v4AssociationsLabelsDelete = async (
    fromObjectType: string,
    toObjectType: string,
    associationTypeId: string,
    params: RequestParams = {}
  ) =>
    this.request<string, string>({
      path: `/crm/v4/associations/${fromObjectType}/${toObjectType}/labels/${associationTypeId}`,
      method: 'DELETE',
      secure: true,
      ...params
    });
  /**
   * No description
   *
   * @tags Carts API > Batch
   * @name V3ObjectsCartsBatchReadCreate
   * @summary Read a batch of carts by internal ID, or unique property values
   * @request POST:/crm/v3/objects/carts/batch/read
   * @secure
   */
  v3ObjectsCartsBatchReadCreate = async (
    data: object,
    query?: {
      /**
       * Whether to return only results that have been archived.
       *
       * @example "false"
       */
      archived?: boolean;
    },
    params: RequestParams = {}
  ) =>
    this.request<object, string>({
      path: '/crm/v3/objects/carts/batch/read',
      method: 'POST',
      query,
      body: data,
      secure: true,
      type: ContentType.Json,
      format: 'json',
      ...params
    });
  /**
   * No description
   *
   * @tags Carts API > Batch
   * @name V3ObjectsCartsBatchArchiveCreate
   * @summary Archive a batch of carts by ID
   * @request POST:/crm/v3/objects/carts/batch/archive
   * @secure
   */
  v3ObjectsCartsBatchArchiveCreate = async (data: object, params: RequestParams = {}) =>
    this.request<string, string>({
      path: '/crm/v3/objects/carts/batch/archive',
      method: 'POST',
      body: data,
      secure: true,
      type: ContentType.Json,
      ...params
    });
  /**
   * No description
   *
   * @tags Carts API > Batch
   * @name V3ObjectsCartsBatchCreateCreate
   * @summary Create a batch of carts
   * @request POST:/crm/v3/objects/carts/batch/create
   * @secure
   */
  v3ObjectsCartsBatchCreateCreate = async (data: object, params: RequestParams = {}) =>
    this.request<object, string>({
      path: '/crm/v3/objects/carts/batch/create',
      method: 'POST',
      body: data,
      secure: true,
      type: ContentType.Json,
      format: 'json',
      ...params
    });
  /**
   * No description
   *
   * @tags Carts API > Batch
   * @name V3ObjectsCartsBatchUpdateCreate
   * @summary Update a batch of carts
   * @request POST:/crm/v3/objects/carts/batch/update
   * @secure
   */
  v3ObjectsCartsBatchUpdateCreate = async (data: object, params: RequestParams = {}) =>
    this.request<object, string>({
      path: '/crm/v3/objects/carts/batch/update',
      method: 'POST',
      body: data,
      secure: true,
      type: ContentType.Json,
      format: 'json',
      ...params
    });
  /**
   *  Read an Object identified by `{cartId}`. `{cartId}` refers to the internal object ID by default, or optionally any unique property value as specified by the `idProperty` query param.  Control what is returned via the `properties` query param.
   *
   * @tags Carts API > Basic
   * @name V3ObjectsCartsDetail
   * @summary Read
   * @request GET:/crm/v3/objects/carts/{cartId}
   * @secure
   */
  v3ObjectsCartsDetail = async (
    cartId: string,
    query?: {
      /**
       * A comma separated list of the properties to be returned in the response. If any of the specified properties are not present on the requested object(s), they will be ignored.
       *
       * @example "<string>"
       */
      properties?: string;
      /**
       * A comma separated list of the properties to be returned along with their history of previous values. If any of the specified properties are not present on the requested object(s), they will be ignored.
       *
       * @example "<string>"
       */
      propertiesWithHistory?: string;
      /**
       * A comma separated list of object types to retrieve associated IDs for. If any of the specified associations do not exist, they will be ignored.
       *
       * @example "<string>"
       */
      associations?: string;
      /**
       * Whether to return only results that have been archived.
       *
       * @example "false"
       */
      archived?: boolean;
      /**
       * The name of a property whose values are unique for this object type
       *
       * @example "<string>"
       */
      idProperty?: string;
    },
    params: RequestParams = {}
  ) =>
    this.request<object, string>({
      path: `/crm/v3/objects/carts/${cartId}`,
      method: 'GET',
      query,
      secure: true,
      format: 'json',
      ...params
    });
  /**
   *  Move an Object identified by `{cartId}` to the recycling bin.
   *
   * @tags Carts API > Basic
   * @name V3ObjectsCartsDelete
   * @summary Archive
   * @request DELETE:/crm/v3/objects/carts/{cartId}
   * @secure
   */
  v3ObjectsCartsDelete = async (cartId: string, params: RequestParams = {}) =>
    this.request<string, string>({
      path: `/crm/v3/objects/carts/${cartId}`,
      method: 'DELETE',
      secure: true,
      ...params
    });
  /**
   *  Perform a partial update of an Object identified by `{cartId}`. `{cartId}` refers to the internal object ID by default, or optionally any unique property value as specified by the `idProperty` query param. Provided property values will be overwritten. Read-only and non-existent properties will be ignored. Properties values can be cleared by passing an empty string.
   *
   * @tags Carts API > Basic
   * @name V3ObjectsCartsPartialUpdate
   * @summary Update
   * @request PATCH:/crm/v3/objects/carts/{cartId}
   * @secure
   */
  v3ObjectsCartsPartialUpdate = async (
    cartId: string,
    data: object,
    query?: {
      /**
       * The name of a property whose values are unique for this object type
       *
       * @example "<string>"
       */
      idProperty?: string;
    },
    params: RequestParams = {}
  ) =>
    this.request<object, string>({
      path: `/crm/v3/objects/carts/${cartId}`,
      method: 'PATCH',
      query,
      body: data,
      secure: true,
      type: ContentType.Json,
      format: 'json',
      ...params
    });
  /**
   *  Read a page of carts. Control what is returned via the `properties` query param.
   *
   * @tags Carts API > Basic
   * @name V3ObjectsCartsList
   * @summary List
   * @request GET:/crm/v3/objects/carts
   * @secure
   */
  v3ObjectsCartsList = async (
    query?: {
      /**
       * The maximum number of results to display per page.
       *
       * @example "10"
       */
      limit?: number;
      /**
       * The paging cursor token of the last successfully read resource will be returned as the `paging.next.after` JSON property of a paged response containing more results.
       *
       * @example "<string>"
       */
      after?: string;
      /**
       * A comma separated list of the properties to be returned in the response. If any of the specified properties are not present on the requested object(s), they will be ignored.
       *
       * @example "<string>"
       */
      properties?: string;
      /**
       * A comma separated list of the properties to be returned along with their history of previous values. If any of the specified properties are not present on the requested object(s), they will be ignored. Usage of this parameter will reduce the maximum number of objects that can be read by a single request.
       *
       * @example "<string>"
       */
      propertiesWithHistory?: string;
      /**
       * A comma separated list of object types to retrieve associated IDs for. If any of the specified associations do not exist, they will be ignored.
       *
       * @example "<string>"
       */
      associations?: string;
      /**
       * Whether to return only results that have been archived.
       *
       * @example "false"
       */
      archived?: boolean;
    },
    params: RequestParams = {}
  ) =>
    this.request<object, string>({
      path: '/crm/v3/objects/carts',
      method: 'GET',
      query,
      secure: true,
      format: 'json',
      ...params
    });
  /**
   *  Create a cart with the given properties and return a copy of the object, including the ID. Documentation and examples for creating standard carts is provided.
   *
   * @tags Carts API > Basic
   * @name V3ObjectsCartsCreate
   * @summary Create
   * @request POST:/crm/v3/objects/carts
   * @secure
   */
  v3ObjectsCartsCreate = async (data: object, params: RequestParams = {}) =>
    this.request<object, string>({
      path: '/crm/v3/objects/carts',
      method: 'POST',
      body: data,
      secure: true,
      type: ContentType.Json,
      format: 'json',
      ...params
    });
  /**
   * No description
   *
   * @tags Carts API > Search
   * @name V3ObjectsCartsSearchCreate
   * @summary post-/crm/v3/objects/carts/search
   * @request POST:/crm/v3/objects/carts/search
   * @secure
   */
  v3ObjectsCartsSearchCreate = async (data: object, params: RequestParams = {}) =>
    this.request<object, string>({
      path: '/crm/v3/objects/carts/search',
      method: 'POST',
      body: data,
      secure: true,
      type: ContentType.Json,
      format: 'json',
      ...params
    });
  /**
   * No description
   *
   * @tags Commerce Payments API > Batch
   * @name V3ObjectsCommercePaymentsBatchReadCreate
   * @summary Read a batch of commerce payments by internal ID, or unique property values
   * @request POST:/crm/v3/objects/commerce_payments/batch/read
   * @secure
   */
  v3ObjectsCommercePaymentsBatchReadCreate = async (
    data: object,
    query?: {
      /**
       * Whether to return only results that have been archived.
       *
       * @example "false"
       */
      archived?: boolean;
    },
    params: RequestParams = {}
  ) =>
    this.request<object, string>({
      path: '/crm/v3/objects/commerce_payments/batch/read',
      method: 'POST',
      query,
      body: data,
      secure: true,
      type: ContentType.Json,
      format: 'json',
      ...params
    });
  /**
   * No description
   *
   * @tags Commerce Payments API > Batch
   * @name V3ObjectsCommercePaymentsBatchArchiveCreate
   * @summary Archive a batch of commerce payments by ID
   * @request POST:/crm/v3/objects/commerce_payments/batch/archive
   */
  v3ObjectsCommercePaymentsBatchArchiveCreate = async (data: object, params: RequestParams = {}) =>
    this.request<string, string>({
      path: '/crm/v3/objects/commerce_payments/batch/archive',
      method: 'POST',
      body: data,
      type: ContentType.Json,
      ...params
    });
  /**
   * No description
   *
   * @tags Commerce Payments API > Batch
   * @name V3ObjectsCommercePaymentsBatchCreateCreate
   * @summary Create a batch of commerce payments
   * @request POST:/crm/v3/objects/commerce_payments/batch/create
   */
  v3ObjectsCommercePaymentsBatchCreateCreate = async (data: object, params: RequestParams = {}) =>
    this.request<object, string>({
      path: '/crm/v3/objects/commerce_payments/batch/create',
      method: 'POST',
      body: data,
      type: ContentType.Json,
      format: 'json',
      ...params
    });
  /**
   * No description
   *
   * @tags Commerce Payments API > Batch
   * @name V3ObjectsCommercePaymentsBatchUpdateCreate
   * @summary Update a batch of commerce payments
   * @request POST:/crm/v3/objects/commerce_payments/batch/update
   */
  v3ObjectsCommercePaymentsBatchUpdateCreate = async (data: object, params: RequestParams = {}) =>
    this.request<object, string>({
      path: '/crm/v3/objects/commerce_payments/batch/update',
      method: 'POST',
      body: data,
      type: ContentType.Json,
      format: 'json',
      ...params
    });
  /**
   *  Read a payment identified by its ID. Include an optional `properties` query parameter to control the properties that are returned.
   *
   * @tags Commerce Payments API > Basic
   * @name V3ObjectsCommercePaymentsDetail
   * @summary Read
   * @request GET:/crm/v3/objects/commerce_payments/{commercePaymentId}
   * @secure
   */
  v3ObjectsCommercePaymentsDetail = async (
    commercePaymentId: string,
    query?: {
      /**
       * A comma separated list of the properties to be returned in the response. If any of the specified properties are not present on the requested payment, they will be ignored.
       *
       * @example "<string>"
       */
      properties?: string;
      /**
       * A comma separated list of the properties to be returned along with their history of previous values. If any of the specified properties are not present on the requested payment, they will be ignored.
       *
       * @example "<string>"
       */
      propertiesWithHistory?: string;
      /**
       * A comma separated list of object types to retrieve associated IDs for. If any of the specified associations do not exist, they will be ignored.
       *
       * @example "<string>"
       */
      associations?: string;
      /**
       * Whether to return only results that have been archived.
       *
       * @example "false"
       */
      archived?: boolean;
      /**
       * The name of a property whose values are unique for this object type.
       *
       * @example "<string>"
       */
      idProperty?: string;
    },
    params: RequestParams = {}
  ) =>
    this.request<object, string>({
      path: `/crm/v3/objects/commerce_payments/${commercePaymentId}`,
      method: 'GET',
      query,
      secure: true,
      format: 'json',
      ...params
    });
  /**
   *  Move an Object identified by `{commercePaymentId}` to the recycling bin.
   *
   * @tags Commerce Payments API > Basic
   * @name V3ObjectsCommercePaymentsDelete
   * @summary Archive
   * @request DELETE:/crm/v3/objects/commerce_payments/{commercePaymentId}
   */
  v3ObjectsCommercePaymentsDelete = async (commercePaymentId: string, params: RequestParams = {}) =>
    this.request<string, string>({
      path: `/crm/v3/objects/commerce_payments/${commercePaymentId}`,
      method: 'DELETE',
      ...params
    });
  /**
   *  Perform a partial update of an Object identified by `{commercePaymentId}`. `{commercePaymentId}` refers to the internal object ID by default, or optionally any unique property value as specified by the `idProperty` query param. Provided property values will be overwritten. Read-only and non-existent properties will be ignored. Properties values can be cleared by passing an empty string.
   *
   * @tags Commerce Payments API > Basic
   * @name V3ObjectsCommercePaymentsPartialUpdate
   * @summary Update
   * @request PATCH:/crm/v3/objects/commerce_payments/{commercePaymentId}
   */
  v3ObjectsCommercePaymentsPartialUpdate = async (
    commercePaymentId: string,
    data: object,
    query?: {
      /**
       * The name of a property whose values are unique for this object type
       *
       * @example "<string>"
       */
      idProperty?: string;
    },
    params: RequestParams = {}
  ) =>
    this.request<object, string>({
      path: `/crm/v3/objects/commerce_payments/${commercePaymentId}`,
      method: 'PATCH',
      query,
      body: data,
      type: ContentType.Json,
      format: 'json',
      ...params
    });
  /**
   *  Read a page of commerce payments. Control what is returned via the `properties` query param.
   *
   * @tags Commerce Payments API > Basic
   * @name V3ObjectsCommercePaymentsList
   * @summary List
   * @request GET:/crm/v3/objects/commerce_payments
   * @secure
   */
  v3ObjectsCommercePaymentsList = async (
    query?: {
      /**
       * The maximum number of results to display per page.
       *
       * @example "10"
       */
      limit?: number;
      /**
       * The paging cursor token of the last successfully read resource will be returned as the `paging.next.after` JSON property of a paged response containing more results.
       *
       * @example "<string>"
       */
      after?: string;
      /**
       * A comma separated list of the properties to be returned in the response. If any of the specified properties are not present on the requested object(s), they will be ignored.
       *
       * @example "<string>"
       */
      properties?: string;
      /**
       * A comma separated list of the properties to be returned along with their history of previous values. If any of the specified properties are not present on the requested object(s), they will be ignored. Usage of this parameter will reduce the maximum number of objects that can be read by a single request.
       *
       * @example "<string>"
       */
      propertiesWithHistory?: string;
      /**
       * A comma separated list of object types to retrieve associated IDs for. If any of the specified associations do not exist, they will be ignored.
       *
       * @example "<string>"
       */
      associations?: string;
      /**
       * Whether to return only results that have been archived.
       *
       * @example "false"
       */
      archived?: boolean;
    },
    params: RequestParams = {}
  ) =>
    this.request<object, string>({
      path: '/crm/v3/objects/commerce_payments',
      method: 'GET',
      query,
      secure: true,
      format: 'json',
      ...params
    });
  /**
   *  Create a commerce payment with the given properties and return a copy of the object, including the ID. Documentation and examples for creating standard commerce payments is provided.
   *
   * @tags Commerce Payments API > Basic
   * @name V3ObjectsCommercePaymentsCreate
   * @summary Create
   * @request POST:/crm/v3/objects/commerce_payments
   */
  v3ObjectsCommercePaymentsCreate = async (data: object, params: RequestParams = {}) =>
    this.request<object, string>({
      path: '/crm/v3/objects/commerce_payments',
      method: 'POST',
      body: data,
      type: ContentType.Json,
      format: 'json',
      ...params
    });
  /**
   * No description
   *
   * @tags Commerce Payments API > Search
   * @name V3ObjectsCommercePaymentsSearchCreate
   * @summary post-/crm/v3/objects/commerce payments/search
   * @request POST:/crm/v3/objects/commerce_payments/search
   * @secure
   */
  v3ObjectsCommercePaymentsSearchCreate = async (data: object, params: RequestParams = {}) =>
    this.request<object, string>({
      path: '/crm/v3/objects/commerce_payments/search',
      method: 'POST',
      body: data,
      secure: true,
      type: ContentType.Json,
      format: 'json',
      ...params
    });
  /**
   * No description
   *
   * @tags Commerce Subscriptions API > Batch
   * @name V3ObjectsSubscriptionsBatchReadCreate
   * @summary Read a batch of subscriptions by internal ID, or unique property values
   * @request POST:/crm/v3/objects/subscriptions/batch/read
   */
  v3ObjectsSubscriptionsBatchReadCreate = async (
    data: object,
    query?: {
      /**
       * Whether to return only results that have been archived.
       *
       * @example "false"
       */
      archived?: boolean;
    },
    params: RequestParams = {}
  ) =>
    this.request<object, string>({
      path: '/crm/v3/objects/subscriptions/batch/read',
      method: 'POST',
      query,
      body: data,
      type: ContentType.Json,
      format: 'json',
      ...params
    });
  /**
   *  Read an Object identified by `{subscriptionId}`. `{subscriptionId}` refers to the internal object ID by default, or optionally any unique property value as specified by the `idProperty` query param.  Control what is returned via the `properties` query param.
   *
   * @tags Commerce Subscriptions API > Basic
   * @name V3ObjectsSubscriptionsDetail
   * @summary Read
   * @request GET:/crm/v3/objects/subscriptions/{subscriptionId}
   */
  v3ObjectsSubscriptionsDetail = async (
    subscriptionId: string,
    query?: {
      /**
       * A comma separated list of the properties to be returned in the response. If any of the specified properties are not present on the requested object(s), they will be ignored.
       *
       * @example "<string>"
       */
      properties?: string;
      /**
       * A comma separated list of the properties to be returned along with their history of previous values. If any of the specified properties are not present on the requested object(s), they will be ignored.
       *
       * @example "<string>"
       */
      propertiesWithHistory?: string;
      /**
       * A comma separated list of object types to retrieve associated IDs for. If any of the specified associations do not exist, they will be ignored.
       *
       * @example "<string>"
       */
      associations?: string;
      /**
       * Whether to return only results that have been archived.
       *
       * @example "false"
       */
      archived?: boolean;
      /**
       * The name of a property whose values are unique for this object type
       *
       * @example "<string>"
       */
      idProperty?: string;
    },
    params: RequestParams = {}
  ) =>
    this.request<object, string>({
      path: `/crm/v3/objects/subscriptions/${subscriptionId}`,
      method: 'GET',
      query,
      format: 'json',
      ...params
    });
  /**
   *  Read a page of subscriptions. Control what is returned via the `properties` query param.
   *
   * @tags Commerce Subscriptions API > Basic
   * @name V3ObjectsSubscriptionsList
   * @summary List
   * @request GET:/crm/v3/objects/subscriptions
   */
  v3ObjectsSubscriptionsList = async (
    query?: {
      /**
       * The maximum number of results to display per page.
       *
       * @example "10"
       */
      limit?: number;
      /**
       * The paging cursor token of the last successfully read resource will be returned as the `paging.next.after` JSON property of a paged response containing more results.
       *
       * @example "<string>"
       */
      after?: string;
      /**
       * A comma separated list of the properties to be returned in the response. If any of the specified properties are not present on the requested object(s), they will be ignored.
       *
       * @example "<string>"
       */
      properties?: string;
      /**
       * A comma separated list of the properties to be returned along with their history of previous values. If any of the specified properties are not present on the requested object(s), they will be ignored. Usage of this parameter will reduce the maximum number of objects that can be read by a single request.
       *
       * @example "<string>"
       */
      propertiesWithHistory?: string;
      /**
       * A comma separated list of object types to retrieve associated IDs for. If any of the specified associations do not exist, they will be ignored.
       *
       * @example "<string>"
       */
      associations?: string;
      /**
       * Whether to return only results that have been archived.
       *
       * @example "false"
       */
      archived?: boolean;
    },
    params: RequestParams = {}
  ) =>
    this.request<object, string>({
      path: '/crm/v3/objects/subscriptions',
      method: 'GET',
      query,
      format: 'json',
      ...params
    });
  /**
   * No description
   *
   * @tags Commerce Subscriptions API > Search
   * @name V3ObjectsSubscriptionsSearchCreate
   * @summary post-/crm/v3/objects/subscriptions/search
   * @request POST:/crm/v3/objects/subscriptions/search
   */
  v3ObjectsSubscriptionsSearchCreate = async (data: object, params: RequestParams = {}) =>
    this.request<object, string>({
      path: '/crm/v3/objects/subscriptions/search',
      method: 'POST',
      body: data,
      type: ContentType.Json,
      format: 'json',
      ...params
    });
  /**
   * No description
   *
   * @tags Companies API > Batch
   * @name V3ObjectsCompaniesBatchReadCreate
   * @summary Read a batch of companies by internal ID, or unique property values
   * @request POST:/crm/v3/objects/companies/batch/read
   * @secure
   */
  v3ObjectsCompaniesBatchReadCreate = async (
    data: object,
    query?: {
      /**
       * Whether to return only results that have been archived.
       *
       * @example "false"
       */
      archived?: boolean;
    },
    params: RequestParams = {}
  ) =>
    this.request<object, string>({
      path: '/crm/v3/objects/companies/batch/read',
      method: 'POST',
      query,
      body: data,
      secure: true,
      type: ContentType.Json,
      format: 'json',
      ...params
    });
  /**
   * No description
   *
   * @tags Companies API > Batch
   * @name V3ObjectsCompaniesBatchCreateCreate
   * @summary Create a batch of companies
   * @request POST:/crm/v3/objects/companies/batch/create
   * @secure
   */
  v3ObjectsCompaniesBatchCreateCreate = async (data: object, params: RequestParams = {}) =>
    this.request<object, string>({
      path: '/crm/v3/objects/companies/batch/create',
      method: 'POST',
      body: data,
      secure: true,
      type: ContentType.Json,
      format: 'json',
      ...params
    });
  /**
   * No description
   *
   * @tags Companies API > Batch
   * @name V3ObjectsCompaniesBatchUpdateCreate
   * @summary Update a batch of companies by internal ID, or unique property values
   * @request POST:/crm/v3/objects/companies/batch/update
   * @secure
   */
  v3ObjectsCompaniesBatchUpdateCreate = async (data: any, params: RequestParams = {}) =>
    this.request<object, string>({
      path: '/crm/v3/objects/companies/batch/update',
      method: 'POST',
      body: data,
      secure: true,
      format: 'json',
      ...params
    });
  /**
   * No description
   *
   * @tags Companies API > Batch
   * @name V3ObjectsCompaniesBatchArchiveCreate
   * @summary Archive a batch of companies by ID
   * @request POST:/crm/v3/objects/companies/batch/archive
   * @secure
   */
  v3ObjectsCompaniesBatchArchiveCreate = async (data: object, params: RequestParams = {}) =>
    this.request<string, string>({
      path: '/crm/v3/objects/companies/batch/archive',
      method: 'POST',
      body: data,
      secure: true,
      type: ContentType.Json,
      ...params
    });
  /**
   *  Read a page of companies. Control what is returned via the `properties` query param.
   *
   * @tags Companies API > Basic
   * @name V3ObjectsCompaniesList
   * @summary List
   * @request GET:/crm/v3/objects/companies
   * @secure
   */
  v3ObjectsCompaniesList = async (
    query?: {
      /**
       * The maximum number of results to display per page.
       *
       * @example "10"
       */
      limit?: number;
      /**
       * The paging cursor token of the last successfully read resource will be returned as the `paging.next.after` JSON property of a paged response containing more results.
       *
       * @example "<string>"
       */
      after?: string;
      /**
       * A comma separated list of the properties to be returned in the response. If any of the specified properties are not present on the requested object(s), they will be ignored.
       *
       * @example "<string>"
       */
      properties?: string;
      /**
       * A comma separated list of the properties to be returned along with their history of previous values. If any of the specified properties are not present on the requested object(s), they will be ignored. Usage of this parameter will reduce the maximum number of objects that can be read by a single request.
       *
       * @example "<string>"
       */
      propertiesWithHistory?: string;
      /**
       * A comma separated list of object types to retrieve associated IDs for. If any of the specified associations do not exist, they will be ignored.
       *
       * @example "<string>"
       */
      associations?: string;
      /**
       * Whether to return only results that have been archived.
       *
       * @example "false"
       */
      archived?: boolean;
    },
    params: RequestParams = {}
  ) =>
    this.request<object, string>({
      path: '/crm/v3/objects/companies',
      method: 'GET',
      query,
      secure: true,
      format: 'json',
      ...params
    });
  /**
   *  Create a company with the given properties and return a copy of the object, including the ID. Documentation and examples for creating standard companies is provided.
   *
   * @tags Companies API > Basic
   * @name V3ObjectsCompaniesCreate
   * @summary Create
   * @request POST:/crm/v3/objects/companies
   * @secure
   */
  v3ObjectsCompaniesCreate = async (data: object, params: RequestParams = {}) =>
    this.request<object, string>({
      path: '/crm/v3/objects/companies',
      method: 'POST',
      body: data,
      secure: true,
      type: ContentType.Json,
      format: 'json',
      ...params
    });
  /**
   *  Read an Object identified by `{companyId}`. `{companyId}` refers to the internal object ID by default, or optionally any unique property value as specified by the `idProperty` query param.  Control what is returned via the `properties` query param.
   *
   * @tags Companies API > Basic
   * @name V3ObjectsCompaniesDetail
   * @summary Read
   * @request GET:/crm/v3/objects/companies/{companyId}
   * @secure
   */
  v3ObjectsCompaniesDetail = async (
    companyId: string,
    query?: {
      /**
       * A comma separated list of the properties to be returned in the response. If any of the specified properties are not present on the requested object(s), they will be ignored.
       *
       * @example "<string>"
       */
      properties?: string;
      /**
       * A comma separated list of the properties to be returned along with their history of previous values. If any of the specified properties are not present on the requested object(s), they will be ignored.
       *
       * @example "<string>"
       */
      propertiesWithHistory?: string;
      /**
       * A comma separated list of object types to retrieve associated IDs for. If any of the specified associations do not exist, they will be ignored.
       *
       * @example "<string>"
       */
      associations?: string;
      /**
       * Whether to return only results that have been archived.
       *
       * @example "false"
       */
      archived?: boolean;
      /**
       * The name of a property whose values are unique for this object type
       *
       * @example "<string>"
       */
      idProperty?: string;
    },
    params: RequestParams = {}
  ) =>
    this.request<object, string>({
      path: `/crm/v3/objects/companies/${companyId}`,
      method: 'GET',
      query,
      secure: true,
      format: 'json',
      ...params
    });
  /**
   *  Move an Object identified by `{companyId}` to the recycling bin.
   *
   * @tags Companies API > Basic
   * @name V3ObjectsCompaniesDelete
   * @summary Archive
   * @request DELETE:/crm/v3/objects/companies/{companyId}
   * @secure
   */
  v3ObjectsCompaniesDelete = async (companyId: string, params: RequestParams = {}) =>
    this.request<string, string>({
      path: `/crm/v3/objects/companies/${companyId}`,
      method: 'DELETE',
      secure: true,
      ...params
    });
  /**
   *  Perform a partial update of an Object identified by `{companyId}`. `{companyId}` refers to the internal object ID by default, or optionally any unique property value as specified by the `idProperty` query param. Provided property values will be overwritten. Read-only and non-existent properties will be ignored. Properties values can be cleared by passing an empty string.
   *
   * @tags Companies API > Basic
   * @name V3ObjectsCompaniesPartialUpdate
   * @summary Update
   * @request PATCH:/crm/v3/objects/companies/{companyId}
   * @secure
   */
  v3ObjectsCompaniesPartialUpdate = async (
    companyId: string,
    data: object,
    query?: {
      /**
       * The name of a property whose values are unique for this object type
       *
       * @example "<string>"
       */
      idProperty?: string;
    },
    params: RequestParams = {}
  ) =>
    this.request<object, string>({
      path: `/crm/v3/objects/companies/${companyId}`,
      method: 'PATCH',
      query,
      body: data,
      secure: true,
      type: ContentType.Json,
      format: 'json',
      ...params
    });
  /**
   * No description
   *
   * @tags Companies API > Search
   * @name V3ObjectsCompaniesSearchCreate
   * @summary post-/crm/v3/objects/companies/search do Search
   * @request POST:/crm/v3/objects/companies/search
   * @secure
   */
  v3ObjectsCompaniesSearchCreate = async (data: any, params: RequestParams = {}) =>
    this.request<object, string>({
      path: '/crm/v3/objects/companies/search',
      method: 'POST',
      body: data,
      secure: true,
      format: 'json',
      ...params
    });
  /**
   * No description
   *
   * @tags Contacts API > Batch
   * @name V3ObjectsContactsBatchArchiveCreate
   * @summary Archive a batch of contacts by ID
   * @request POST:/crm/v3/objects/contacts/batch/archive
   * @secure
   */
  v3ObjectsContactsBatchArchiveCreate = async (data: object, params: RequestParams = {}) =>
    this.request<string, string>({
      path: '/crm/v3/objects/contacts/batch/archive',
      method: 'POST',
      body: data,
      secure: true,
      type: ContentType.Json,
      ...params
    });
  /**
   * No description
   *
   * @tags Contacts API > Batch
   * @name V3ObjectsContactsBatchUpdateCreate
   * @summary Update a batch of contacts by internal ID, or unique property values
   * @request POST:/crm/v3/objects/contacts/batch/update
   * @secure
   */
  v3ObjectsContactsBatchUpdateCreate = async (data: any, params: RequestParams = {}) =>
    this.request<object, string>({
      path: '/crm/v3/objects/contacts/batch/update',
      method: 'POST',
      body: data,
      secure: true,
      format: 'json',
      ...params
    });
  /**
   * No description
   *
   * @tags Contacts API > Batch
   * @name V3ObjectsContactsBatchCreateCreate
   * @summary Create a batch of contacts
   * @request POST:/crm/v3/objects/contacts/batch/create
   * @secure
   */
  v3ObjectsContactsBatchCreateCreate = async (data: object, params: RequestParams = {}) =>
    this.request<object, string>({
      path: '/crm/v3/objects/contacts/batch/create',
      method: 'POST',
      body: data,
      secure: true,
      type: ContentType.Json,
      format: 'json',
      ...params
    });
  /**
   * No description
   *
   * @tags Contacts API > Batch
   * @name V3ObjectsContactsBatchReadCreate
   * @summary Read a batch of contacts by internal ID, or unique property values
   * @request POST:/crm/v3/objects/contacts/batch/read
   * @secure
   */
  v3ObjectsContactsBatchReadCreate = async (
    data: object,
    query?: {
      /**
       * Whether to return only results that have been archived.
       *
       * @example "false"
       */
      archived?: boolean;
    },
    params: RequestParams = {}
  ) =>
    this.request<object, string>({
      path: '/crm/v3/objects/contacts/batch/read',
      method: 'POST',
      query,
      body: data,
      secure: true,
      type: ContentType.Json,
      format: 'json',
      ...params
    });
  /**
   *  Read a page of contacts. Control what is returned via the `properties` query param.
   *
   * @tags Contacts API > Basic
   * @name V3ObjectsContactsList
   * @summary List
   * @request GET:/crm/v3/objects/contacts
   * @secure
   */
  v3ObjectsContactsList = async (
    query?: {
      /**
       * The maximum number of results to display per page.
       *
       * @example "10"
       */
      limit?: number;
      /**
       * The paging cursor token of the last successfully read resource will be returned as the `paging.next.after` JSON property of a paged response containing more results.
       *
       * @example "<string>"
       */
      after?: string;
      /**
       * A comma separated list of the properties to be returned in the response. If any of the specified properties are not present on the requested object(s), they will be ignored.
       *
       * @example "<string>"
       */
      properties?: string;
      /**
       * A comma separated list of the properties to be returned along with their history of previous values. If any of the specified properties are not present on the requested object(s), they will be ignored. Usage of this parameter will reduce the maximum number of objects that can be read by a single request.
       *
       * @example "<string>"
       */
      propertiesWithHistory?: string;
      /**
       * A comma separated list of object types to retrieve associated IDs for. If any of the specified associations do not exist, they will be ignored.
       *
       * @example "<string>"
       */
      associations?: string;
      /**
       * Whether to return only results that have been archived.
       *
       * @example "false"
       */
      archived?: boolean;
    },
    params: RequestParams = {}
  ) =>
    this.request<object, string>({
      path: '/crm/v3/objects/contacts',
      method: 'GET',
      query,
      secure: true,
      format: 'json',
      ...params
    });
  /**
   *  Create a contact with the given properties and return a copy of the object, including the ID. Documentation and examples for creating standard contacts is provided.
   *
   * @tags Contacts API > Basic
   * @name V3ObjectsContactsCreate
   * @summary Create
   * @request POST:/crm/v3/objects/contacts
   * @secure
   */
  v3ObjectsContactsCreate = async (data: object, params: RequestParams = {}) =>
    this.request<object, string>({
      path: '/crm/v3/objects/contacts',
      method: 'POST',
      body: data,
      secure: true,
      type: ContentType.Json,
      format: 'json',
      ...params
    });
  /**
   *  Read an Object identified by `{contactId}`. `{contactId}` refers to the internal object ID.  Control what is returned via the `properties` query param.
   *
   * @tags Contacts API > Basic
   * @name V3ObjectsContactsDetail
   * @summary Read
   * @request GET:/crm/v3/objects/contacts/{contactId}
   * @secure
   */
  v3ObjectsContactsDetail = async (
    contactId: string,
    query?: {
      /**
       * A comma separated list of the properties to be returned in the response. If any of the specified properties are not present on the requested object(s), they will be ignored.
       *
       * @example "<string>"
       */
      properties?: string;
      /**
       * A comma separated list of the properties to be returned along with their history of previous values. If any of the specified properties are not present on the requested object(s), they will be ignored.
       *
       * @example "<string>"
       */
      propertiesWithHistory?: string;
      /**
       * A comma separated list of object types to retrieve associated IDs for. If any of the specified associations do not exist, they will be ignored.
       *
       * @example "<string>"
       */
      associations?: string;
      /**
       * Whether to return only results that have been archived.
       *
       * @example "false"
       */
      archived?: boolean;
    },
    params: RequestParams = {}
  ) =>
    this.request<object, string>({
      path: `/crm/v3/objects/contacts/${contactId}`,
      method: 'GET',
      query,
      secure: true,
      format: 'json',
      ...params
    });
  /**
   *  Move an Object identified by `{contactId}` to the recycling bin.
   *
   * @tags Contacts API > Basic
   * @name V3ObjectsContactsDelete
   * @summary Archive
   * @request DELETE:/crm/v3/objects/contacts/{contactId}
   * @secure
   */
  v3ObjectsContactsDelete = async (contactId: string, params: RequestParams = {}) =>
    this.request<string, string>({
      path: `/crm/v3/objects/contacts/${contactId}`,
      method: 'DELETE',
      secure: true,
      ...params
    });
  /**
   *  Perform a partial update of an Object identified by `{contactId}`. `{contactId}` refers to the internal object ID. Provided property values will be overwritten. Read-only and non-existent properties will be ignored. Properties values can be cleared by passing an empty string.
   *
   * @tags Contacts API > Basic
   * @name V3ObjectsContactsPartialUpdate
   * @summary Update
   * @request PATCH:/crm/v3/objects/contacts/{contactId}
   * @secure
   */
  v3ObjectsContactsPartialUpdate = async (
    contactId: string,
    data: object,
    params: RequestParams = {}
  ) =>
    this.request<object, string>({
      path: `/crm/v3/objects/contacts/${contactId}`,
      method: 'PATCH',
      body: data,
      secure: true,
      type: ContentType.Json,
      format: 'json',
      ...params
    });
  /**
   * No description
   *
   * @tags Contacts API > Search
   * @name V3ObjectsContactsSearchCreate
   * @summary post-/crm/v3/objects/contacts/search do Search
   * @request POST:/crm/v3/objects/contacts/search
   * @secure
   */
  v3ObjectsContactsSearchCreate = async (data: any, params: RequestParams = {}) =>
    this.request<object, string>({
      path: '/crm/v3/objects/contacts/search',
      method: 'POST',
      body: data,
      secure: true,
      format: 'json',
      ...params
    });
  /**
   *  Returns a list of cards for a given app.
   *
   * @tags CRM Cards API > Cards
   * @name V3ExtensionsCardsDevDetail
   * @summary Get all cards
   * @request GET:/crm/v3/extensions/cards-dev/{appId}
   * @secure
   */
  v3ExtensionsCardsDevDetail = async (appId: string, params: RequestParams = {}) =>
    this.request<object, string>({
      path: `/crm/v3/extensions/cards-dev/${appId}`,
      method: 'GET',
      secure: true,
      format: 'json',
      ...params
    });
  /**
   *  Defines a new card that will become active on an account when this app is installed.
   *
   * @tags CRM Cards API > Cards
   * @name V3ExtensionsCardsDevCreate
   * @summary Create a new card
   * @request POST:/crm/v3/extensions/cards-dev/{appId}
   * @secure
   */
  v3ExtensionsCardsDevCreate = async (appId: string, data: object, params: RequestParams = {}) =>
    this.request<object, string>({
      path: `/crm/v3/extensions/cards-dev/${appId}`,
      method: 'POST',
      body: data,
      secure: true,
      type: ContentType.Json,
      format: 'json',
      ...params
    });
  /**
   *  Returns the definition for a card with the given ID.
   *
   * @tags CRM Cards API > Cards
   * @name V3ExtensionsCardsDevDetail2
   * @summary Get a card.
   * @request GET:/crm/v3/extensions/cards-dev/{appId}/{cardId}
   * @originalName v3ExtensionsCardsDevDetail
   * @duplicate
   * @secure
   */
  v3ExtensionsCardsDevDetail2 = async (appId: string, cardId: string, params: RequestParams = {}) =>
    this.request<object, string>({
      path: `/crm/v3/extensions/cards-dev/${appId}/${cardId}`,
      method: 'GET',
      secure: true,
      format: 'json',
      ...params
    });
  /**
   *  Permanently deletes a card definition with the given ID. Once deleted, data fetch requests for this card will no longer be sent to your service. This can't be undone.
   *
   * @tags CRM Cards API > Cards
   * @name V3ExtensionsCardsDevDelete
   * @summary Delete a card
   * @request DELETE:/crm/v3/extensions/cards-dev/{appId}/{cardId}
   * @secure
   */
  v3ExtensionsCardsDevDelete = async (appId: string, cardId: string, params: RequestParams = {}) =>
    this.request<string, string>({
      path: `/crm/v3/extensions/cards-dev/${appId}/${cardId}`,
      method: 'DELETE',
      secure: true,
      ...params
    });
  /**
   *  Update a card definition with new details.
   *
   * @tags CRM Cards API > Cards
   * @name V3ExtensionsCardsDevPartialUpdate
   * @summary Update a card
   * @request PATCH:/crm/v3/extensions/cards-dev/{appId}/{cardId}
   * @secure
   */
  v3ExtensionsCardsDevPartialUpdate = async (
    appId: string,
    cardId: string,
    data: object,
    params: RequestParams = {}
  ) =>
    this.request<object, string>({
      path: `/crm/v3/extensions/cards-dev/${appId}/${cardId}`,
      method: 'PATCH',
      body: data,
      secure: true,
      type: ContentType.Json,
      format: 'json',
      ...params
    });
  /**
   *  Returns an example card detail response. This is the payload with displayed details for a card that will be shown to a user. An app should send this in response to the data fetch request.
   *
   * @tags CRM Cards API > SampleResponse
   * @name V3ExtensionsCardsDevSampleResponseList
   * @summary Get sample card detail response
   * @request GET:/crm/v3/extensions/cards-dev/sample-response
   */
  v3ExtensionsCardsDevSampleResponseList = async (params: RequestParams = {}) =>
    this.request<object, string>({
      path: '/crm/v3/extensions/cards-dev/sample-response',
      method: 'GET',
      format: 'json',
      ...params
    });
  /**
   * No description
   *
   * @tags Objects API > Batch
   * @name V3ObjectsBatchReadCreate
   * @summary Read a batch of objects by internal ID, or unique property values
   * @request POST:/crm/v3/objects/{objectType}/batch/read
   * @secure
   */
  v3ObjectsBatchReadCreate = async (
    objectType: string,
    data: object,
    query?: {
      /**
       * Whether to return only results that have been archived.
       *
       * @example "false"
       */
      archived?: boolean;
    },
    params: RequestParams = {}
  ) =>
    this.request<object, string>({
      path: `/crm/v3/objects/${objectType}/batch/read`,
      method: 'POST',
      query,
      body: data,
      secure: true,
      type: ContentType.Json,
      format: 'json',
      ...params
    });
  /**
   * No description
   *
   * @tags Objects API > Batch
   * @name V3ObjectsBatchArchiveCreate
   * @summary Archive a batch of objects by ID
   * @request POST:/crm/v3/objects/{objectType}/batch/archive
   * @secure
   */
  v3ObjectsBatchArchiveCreate = async (
    objectType: string,
    data: object,
    params: RequestParams = {}
  ) =>
    this.request<string, string>({
      path: `/crm/v3/objects/${objectType}/batch/archive`,
      method: 'POST',
      body: data,
      secure: true,
      type: ContentType.Json,
      ...params
    });
  /**
   * No description
   *
   * @tags Objects API > Batch
   * @name V3ObjectsBatchCreateCreate
   * @summary Create a batch of objects
   * @request POST:/crm/v3/objects/{objectType}/batch/create
   * @secure
   */
  v3ObjectsBatchCreateCreate = async (
    objectType: string,
    data: object,
    params: RequestParams = {}
  ) =>
    this.request<object, string>({
      path: `/crm/v3/objects/${objectType}/batch/create`,
      method: 'POST',
      body: data,
      secure: true,
      type: ContentType.Json,
      format: 'json',
      ...params
    });
  /**
   * No description
   *
   * @tags Objects API > Batch
   * @name V3ObjectsBatchUpdateCreate
   * @summary Update a batch of objects by internal ID, or unique property values
   * @request POST:/crm/v3/objects/{objectType}/batch/update
   * @secure
   */
  v3ObjectsBatchUpdateCreate = async (objectType: string, data: any, params: RequestParams = {}) =>
    this.request<object, string>({
      path: `/crm/v3/objects/${objectType}/batch/update`,
      method: 'POST',
      body: data,
      secure: true,
      format: 'json',
      ...params
    });
  /**
   *  Read an Object identified by `{objectId}`. `{objectId}` refers to the internal object ID by default, or optionally any unique property value as specified by the `idProperty` query param.  Control what is returned via the `properties` query param.
   *
   * @tags Objects API > Basic
   * @name V3ObjectsDetail
   * @summary Read
   * @request GET:/crm/v3/objects/{objectType}/{objectId}
   * @secure
   */
  v3ObjectsDetail = async (
    objectType: string,
    objectId: string,
    query?: {
      /**
       * A comma separated list of the properties to be returned in the response. If any of the specified properties are not present on the requested object(s), they will be ignored.
       *
       * @example "<string>"
       */
      properties?: string;
      /**
       * A comma separated list of the properties to be returned along with their history of previous values. If any of the specified properties are not present on the requested object(s), they will be ignored.
       *
       * @example "<string>"
       */
      propertiesWithHistory?: string;
      /**
       * A comma separated list of object types to retrieve associated IDs for. If any of the specified associations do not exist, they will be ignored.
       *
       * @example "<string>"
       */
      associations?: string;
      /**
       * Whether to return only results that have been archived.
       *
       * @example "false"
       */
      archived?: boolean;
      /**
       * The name of a property whose values are unique for this object type
       *
       * @example "<string>"
       */
      idProperty?: string;
    },
    params: RequestParams = {}
  ) =>
    this.request<object, string>({
      path: `/crm/v3/objects/${objectType}/${objectId}`,
      method: 'GET',
      query,
      secure: true,
      format: 'json',
      ...params
    });
  /**
   *  Move an Object identified by `{objectId}` to the recycling bin.
   *
   * @tags Objects API > Basic
   * @name V3ObjectsDelete
   * @summary Archive
   * @request DELETE:/crm/v3/objects/{objectType}/{objectId}
   * @secure
   */
  v3ObjectsDelete = async (objectType: string, objectId: string, params: RequestParams = {}) =>
    this.request<string, string>({
      path: `/crm/v3/objects/${objectType}/${objectId}`,
      method: 'DELETE',
      secure: true,
      ...params
    });
  /**
   *  Perform a partial update of an Object identified by `{objectId}`. `{objectId}` refers to the internal object ID by default, or optionally any unique property value as specified by the `idProperty` query param. Provided property values will be overwritten. Read-only and non-existent properties will be ignored. Properties values can be cleared by passing an empty string.
   *
   * @tags Objects API > Basic
   * @name V3ObjectsPartialUpdate
   * @summary Update
   * @request PATCH:/crm/v3/objects/{objectType}/{objectId}
   * @secure
   */
  v3ObjectsPartialUpdate = async (
    objectType: string,
    objectId: string,
    data: object,
    query?: {
      /**
       * The name of a property whose values are unique for this object type
       *
       * @example "<string>"
       */
      idProperty?: string;
    },
    params: RequestParams = {}
  ) =>
    this.request<object, string>({
      path: `/crm/v3/objects/${objectType}/${objectId}`,
      method: 'PATCH',
      query,
      body: data,
      secure: true,
      type: ContentType.Json,
      format: 'json',
      ...params
    });
  /**
   *  Read a page of objects. Control what is returned via the `properties` query param.
   *
   * @tags Objects API > Basic
   * @name V3ObjectsDetail2
   * @summary List
   * @request GET:/crm/v3/objects/{objectType}
   * @originalName v3ObjectsDetail
   * @duplicate
   * @secure
   */
  v3ObjectsDetail2 = async (
    objectType: string,
    query?: {
      /**
       * The maximum number of results to display per page.
       *
       * @example "10"
       */
      limit?: number;
      /**
       * The paging cursor token of the last successfully read resource will be returned as the `paging.next.after` JSON property of a paged response containing more results.
       *
       * @example "<string>"
       */
      after?: string;
      /**
       * A comma separated list of the properties to be returned in the response. If any of the specified properties are not present on the requested object(s), they will be ignored.
       *
       * @example "<string>"
       */
      properties?: string;
      /**
       * A comma separated list of the properties to be returned along with their history of previous values. If any of the specified properties are not present on the requested object(s), they will be ignored. Usage of this parameter will reduce the maximum number of objects that can be read by a single request.
       *
       * @example "<string>"
       */
      propertiesWithHistory?: string;
      /**
       * A comma separated list of object types to retrieve associated IDs for. If any of the specified associations do not exist, they will be ignored.
       *
       * @example "<string>"
       */
      associations?: string;
      /**
       * Whether to return only results that have been archived.
       *
       * @example "false"
       */
      archived?: boolean;
    },
    params: RequestParams = {}
  ) =>
    this.request<object, string>({
      path: `/crm/v3/objects/${objectType}`,
      method: 'GET',
      query,
      secure: true,
      format: 'json',
      ...params
    });
  /**
   *  Create a CRM object with the given properties and return a copy of the object, including the ID. Documentation and examples for creating standard objects is provided.
   *
   * @tags Objects API > Basic
   * @name V3ObjectsCreate
   * @summary Create
   * @request POST:/crm/v3/objects/{objectType}
   * @secure
   */
  v3ObjectsCreate = async (objectType: string, data: object, params: RequestParams = {}) =>
    this.request<object, string>({
      path: `/crm/v3/objects/${objectType}`,
      method: 'POST',
      body: data,
      secure: true,
      type: ContentType.Json,
      format: 'json',
      ...params
    });
  /**
   * No description
   *
   * @tags Objects API > Search
   * @name V3ObjectsSearchCreate
   * @summary post-/crm/v3/objects/{object Type}/search do Search
   * @request POST:/crm/v3/objects/{objectType}/search
   * @secure
   */
  v3ObjectsSearchCreate = async (objectType: string, data: object, params: RequestParams = {}) =>
    this.request<object, string>({
      path: `/crm/v3/objects/${objectType}/search`,
      method: 'POST',
      body: data,
      secure: true,
      type: ContentType.Json,
      format: 'json',
      ...params
    });
  /**
   * No description
   *
   * @tags Deals API > Batch
   * @name V3ObjectsDealsBatchUpdateCreate
   * @summary Update a batch of deals by internal ID, or unique property values
   * @request POST:/crm/v3/objects/deals/batch/update
   * @secure
   */
  v3ObjectsDealsBatchUpdateCreate = async (data: any, params: RequestParams = {}) =>
    this.request<object, string>({
      path: '/crm/v3/objects/deals/batch/update',
      method: 'POST',
      body: data,
      secure: true,
      format: 'json',
      ...params
    });
  /**
   * No description
   *
   * @tags Deals API > Batch
   * @name V3ObjectsDealsBatchArchiveCreate
   * @summary Archive a batch of deals by ID
   * @request POST:/crm/v3/objects/deals/batch/archive
   * @secure
   */
  v3ObjectsDealsBatchArchiveCreate = async (data: object, params: RequestParams = {}) =>
    this.request<string, string>({
      path: '/crm/v3/objects/deals/batch/archive',
      method: 'POST',
      body: data,
      secure: true,
      type: ContentType.Json,
      ...params
    });
  /**
   * No description
   *
   * @tags Deals API > Batch
   * @name V3ObjectsDealsBatchCreateCreate
   * @summary Create a batch of deals
   * @request POST:/crm/v3/objects/deals/batch/create
   * @secure
   */
  v3ObjectsDealsBatchCreateCreate = async (data: object, params: RequestParams = {}) =>
    this.request<object, string>({
      path: '/crm/v3/objects/deals/batch/create',
      method: 'POST',
      body: data,
      secure: true,
      type: ContentType.Json,
      format: 'json',
      ...params
    });
  /**
   * No description
   *
   * @tags Deals API > Batch
   * @name V3ObjectsDealsBatchReadCreate
   * @summary Read a batch of deals by internal ID, or unique property values
   * @request POST:/crm/v3/objects/deals/batch/read
   * @secure
   */
  v3ObjectsDealsBatchReadCreate = async (
    data: object,
    query?: {
      /**
       * Whether to return only results that have been archived.
       *
       * @example "false"
       */
      archived?: boolean;
    },
    params: RequestParams = {}
  ) =>
    this.request<object, string>({
      path: '/crm/v3/objects/deals/batch/read',
      method: 'POST',
      query,
      body: data,
      secure: true,
      type: ContentType.Json,
      format: 'json',
      ...params
    });
  /**
   *  Read a page of deals. Control what is returned via the `properties` query param.
   *
   * @tags Deals API > Basic
   * @name V3ObjectsDealsList
   * @summary List
   * @request GET:/crm/v3/objects/deals
   * @secure
   */
  v3ObjectsDealsList = async (
    query?: {
      /**
       * The maximum number of results to display per page.
       *
       * @example "10"
       */
      limit?: number;
      /**
       * The paging cursor token of the last successfully read resource will be returned as the `paging.next.after` JSON property of a paged response containing more results.
       *
       * @example "<string>"
       */
      after?: string;
      /**
       * A comma separated list of the properties to be returned in the response. If any of the specified properties are not present on the requested object(s), they will be ignored.
       *
       * @example "<string>"
       */
      properties?: string;
      /**
       * A comma separated list of the properties to be returned along with their history of previous values. If any of the specified properties are not present on the requested object(s), they will be ignored. Usage of this parameter will reduce the maximum number of objects that can be read by a single request.
       *
       * @example "<string>"
       */
      propertiesWithHistory?: string;
      /**
       * A comma separated list of object types to retrieve associated IDs for. If any of the specified associations do not exist, they will be ignored.
       *
       * @example "<string>"
       */
      associations?: string;
      /**
       * Whether to return only results that have been archived.
       *
       * @example "false"
       */
      archived?: boolean;
    },
    params: RequestParams = {}
  ) =>
    this.request<object, string>({
      path: '/crm/v3/objects/deals',
      method: 'GET',
      query,
      secure: true,
      format: 'json',
      ...params
    });
  /**
   *  Create a deal with the given properties and return a copy of the object, including the ID. Documentation and examples for creating standard deals is provided.
   *
   * @tags Deals API > Basic
   * @name V3ObjectsDealsCreate
   * @summary Create
   * @request POST:/crm/v3/objects/deals
   * @secure
   */
  v3ObjectsDealsCreate = async (data: object, params: RequestParams = {}) =>
    this.request<object, string>({
      path: '/crm/v3/objects/deals',
      method: 'POST',
      body: data,
      secure: true,
      type: ContentType.Json,
      format: 'json',
      ...params
    });
  /**
   *  Read an Object identified by `{dealId}`. `{dealId}` refers to the internal object ID by default, or optionally any unique property value as specified by the `idProperty` query param.  Control what is returned via the `properties` query param.
   *
   * @tags Deals API > Basic
   * @name V3ObjectsDealsDetail
   * @summary Read
   * @request GET:/crm/v3/objects/deals/{dealId}
   * @secure
   */
  v3ObjectsDealsDetail = async (
    dealId: string,
    query?: {
      /**
       * A comma separated list of the properties to be returned in the response. If any of the specified properties are not present on the requested object(s), they will be ignored.
       *
       * @example "<string>"
       */
      properties?: string;
      /**
       * A comma separated list of the properties to be returned along with their history of previous values. If any of the specified properties are not present on the requested object(s), they will be ignored.
       *
       * @example "<string>"
       */
      propertiesWithHistory?: string;
      /**
       * A comma separated list of object types to retrieve associated IDs for. If any of the specified associations do not exist, they will be ignored.
       *
       * @example "<string>"
       */
      associations?: string;
      /**
       * Whether to return only results that have been archived.
       *
       * @example "false"
       */
      archived?: boolean;
      /**
       * The name of a property whose values are unique for this object type
       *
       * @example "<string>"
       */
      idProperty?: string;
    },
    params: RequestParams = {}
  ) =>
    this.request<object, string>({
      path: `/crm/v3/objects/deals/${dealId}`,
      method: 'GET',
      query,
      secure: true,
      format: 'json',
      ...params
    });
  /**
   *  Move an Object identified by `{dealId}` to the recycling bin.
   *
   * @tags Deals API > Basic
   * @name V3ObjectsDealsDelete
   * @summary Archive
   * @request DELETE:/crm/v3/objects/deals/{dealId}
   * @secure
   */
  v3ObjectsDealsDelete = async (dealId: string, params: RequestParams = {}) =>
    this.request<string, string>({
      path: `/crm/v3/objects/deals/${dealId}`,
      method: 'DELETE',
      secure: true,
      ...params
    });
  /**
   *  Perform a partial update of an Object identified by `{dealId}`. `{dealId}` refers to the internal object ID by default, or optionally any unique property value as specified by the `idProperty` query param. Provided property values will be overwritten. Read-only and non-existent properties will be ignored. Properties values can be cleared by passing an empty string.
   *
   * @tags Deals API > Basic
   * @name V3ObjectsDealsPartialUpdate
   * @summary Update
   * @request PATCH:/crm/v3/objects/deals/{dealId}
   * @secure
   */
  v3ObjectsDealsPartialUpdate = async (
    dealId: string,
    data: object,
    query?: {
      /**
       * The name of a property whose values are unique for this object type
       *
       * @example "<string>"
       */
      idProperty?: string;
    },
    params: RequestParams = {}
  ) =>
    this.request<object, string>({
      path: `/crm/v3/objects/deals/${dealId}`,
      method: 'PATCH',
      query,
      body: data,
      secure: true,
      type: ContentType.Json,
      format: 'json',
      ...params
    });
  /**
   * No description
   *
   * @tags Deals API > Search
   * @name V3ObjectsDealsSearchCreate
   * @summary post-/crm/v3/objects/deals/search do Search
   * @request POST:/crm/v3/objects/deals/search
   * @secure
   */
  v3ObjectsDealsSearchCreate = async (data: any, params: RequestParams = {}) =>
    this.request<object, string>({
      path: '/crm/v3/objects/deals/search',
      method: 'POST',
      body: data,
      secure: true,
      format: 'json',
      ...params
    });
  /**
   * No description
   *
   * @tags Deal Splits API > Batch
   * @name V3ObjectsDealsSplitsBatchUpsertCreate
   * @summary Create or replace deal splits for deals with the provided IDs. Deal split percentages for each deal must sum up to 1.0 (100%) and may have up to 8 decimal places
   * @request POST:/crm/v3/objects/deals/splits/batch/upsert
   * @secure
   */
  v3ObjectsDealsSplitsBatchUpsertCreate = async (data: object, params: RequestParams = {}) =>
    this.request<object, string>({
      path: '/crm/v3/objects/deals/splits/batch/upsert',
      method: 'POST',
      body: data,
      secure: true,
      type: ContentType.Json,
      format: 'json',
      ...params
    });
  /**
   * No description
   *
   * @tags Deal Splits API > Batch
   * @name V3ObjectsDealsSplitsBatchReadCreate
   * @summary Read a batch of deal split objects by their associated deal object internal ID
   * @request POST:/crm/v3/objects/deals/splits/batch/read
   * @secure
   */
  v3ObjectsDealsSplitsBatchReadCreate = async (data: object, params: RequestParams = {}) =>
    this.request<object, string>({
      path: '/crm/v3/objects/deals/splits/batch/read',
      method: 'POST',
      body: data,
      secure: true,
      type: ContentType.Json,
      format: 'json',
      ...params
    });
  /**
   * No description
   *
   * @tags Discounts API > Batch
   * @name V3ObjectsDiscountsBatchUpdateCreate
   * @summary Update a batch of discounts
   * @request POST:/crm/v3/objects/discounts/batch/update
   * @secure
   */
  v3ObjectsDiscountsBatchUpdateCreate = async (data: object, params: RequestParams = {}) =>
    this.request<object, string>({
      path: '/crm/v3/objects/discounts/batch/update',
      method: 'POST',
      body: data,
      secure: true,
      type: ContentType.Json,
      format: 'json',
      ...params
    });
  /**
   * No description
   *
   * @tags Discounts API > Batch
   * @name V3ObjectsDiscountsBatchCreateCreate
   * @summary Create a batch of discounts
   * @request POST:/crm/v3/objects/discounts/batch/create
   * @secure
   */
  v3ObjectsDiscountsBatchCreateCreate = async (data: object, params: RequestParams = {}) =>
    this.request<object, string>({
      path: '/crm/v3/objects/discounts/batch/create',
      method: 'POST',
      body: data,
      secure: true,
      type: ContentType.Json,
      format: 'json',
      ...params
    });
  /**
   * No description
   *
   * @tags Discounts API > Batch
   * @name V3ObjectsDiscountsBatchArchiveCreate
   * @summary Archive a batch of discounts by ID
   * @request POST:/crm/v3/objects/discounts/batch/archive
   * @secure
   */
  v3ObjectsDiscountsBatchArchiveCreate = async (data: object, params: RequestParams = {}) =>
    this.request<string, string>({
      path: '/crm/v3/objects/discounts/batch/archive',
      method: 'POST',
      body: data,
      secure: true,
      type: ContentType.Json,
      ...params
    });
  /**
   * No description
   *
   * @tags Discounts API > Batch
   * @name V3ObjectsDiscountsBatchReadCreate
   * @summary Read a batch of discounts by internal ID, or unique property values
   * @request POST:/crm/v3/objects/discounts/batch/read
   * @secure
   */
  v3ObjectsDiscountsBatchReadCreate = async (
    data: object,
    query?: {
      /**
       * Whether to return only results that have been archived.
       *
       * @example "false"
       */
      archived?: boolean;
    },
    params: RequestParams = {}
  ) =>
    this.request<object, string>({
      path: '/crm/v3/objects/discounts/batch/read',
      method: 'POST',
      query,
      body: data,
      secure: true,
      type: ContentType.Json,
      format: 'json',
      ...params
    });
  /**
   *  Read an Object identified by `{discountId}`. `{discountId}` refers to the internal object ID by default, or optionally any unique property value as specified by the `idProperty` query param.  Control what is returned via the `properties` query param.
   *
   * @tags Discounts API > Basic
   * @name V3ObjectsDiscountsDetail
   * @summary Read
   * @request GET:/crm/v3/objects/discounts/{discountId}
   * @secure
   */
  v3ObjectsDiscountsDetail = async (
    discountId: string,
    query?: {
      /**
       * A comma separated list of the properties to be returned in the response. If any of the specified properties are not present on the requested object(s), they will be ignored.
       *
       * @example "<string>"
       */
      properties?: string;
      /**
       * A comma separated list of the properties to be returned along with their history of previous values. If any of the specified properties are not present on the requested object(s), they will be ignored.
       *
       * @example "<string>"
       */
      propertiesWithHistory?: string;
      /**
       * A comma separated list of object types to retrieve associated IDs for. If any of the specified associations do not exist, they will be ignored.
       *
       * @example "<string>"
       */
      associations?: string;
      /**
       * Whether to return only results that have been archived.
       *
       * @example "false"
       */
      archived?: boolean;
      /**
       * The name of a property whose values are unique for this object type
       *
       * @example "<string>"
       */
      idProperty?: string;
    },
    params: RequestParams = {}
  ) =>
    this.request<object, string>({
      path: `/crm/v3/objects/discounts/${discountId}`,
      method: 'GET',
      query,
      secure: true,
      format: 'json',
      ...params
    });
  /**
   *  Move an Object identified by `{discountId}` to the recycling bin.
   *
   * @tags Discounts API > Basic
   * @name V3ObjectsDiscountsDelete
   * @summary Archive
   * @request DELETE:/crm/v3/objects/discounts/{discountId}
   * @secure
   */
  v3ObjectsDiscountsDelete = async (discountId: string, params: RequestParams = {}) =>
    this.request<string, string>({
      path: `/crm/v3/objects/discounts/${discountId}`,
      method: 'DELETE',
      secure: true,
      ...params
    });
  /**
   *  Perform a partial update of an Object identified by `{discountId}`. `{discountId}` refers to the internal object ID by default, or optionally any unique property value as specified by the `idProperty` query param. Provided property values will be overwritten. Read-only and non-existent properties will be ignored. Properties values can be cleared by passing an empty string.
   *
   * @tags Discounts API > Basic
   * @name V3ObjectsDiscountsPartialUpdate
   * @summary Update
   * @request PATCH:/crm/v3/objects/discounts/{discountId}
   * @secure
   */
  v3ObjectsDiscountsPartialUpdate = async (
    discountId: string,
    data: object,
    query?: {
      /**
       * The name of a property whose values are unique for this object type
       *
       * @example "<string>"
       */
      idProperty?: string;
    },
    params: RequestParams = {}
  ) =>
    this.request<object, string>({
      path: `/crm/v3/objects/discounts/${discountId}`,
      method: 'PATCH',
      query,
      body: data,
      secure: true,
      type: ContentType.Json,
      format: 'json',
      ...params
    });
  /**
   *  Read a page of discounts. Control what is returned via the `properties` query param.
   *
   * @tags Discounts API > Basic
   * @name V3ObjectsDiscountsList
   * @summary List
   * @request GET:/crm/v3/objects/discounts
   * @secure
   */
  v3ObjectsDiscountsList = async (
    query?: {
      /**
       * The maximum number of results to display per page.
       *
       * @example "10"
       */
      limit?: number;
      /**
       * The paging cursor token of the last successfully read resource will be returned as the `paging.next.after` JSON property of a paged response containing more results.
       *
       * @example "<string>"
       */
      after?: string;
      /**
       * A comma separated list of the properties to be returned in the response. If any of the specified properties are not present on the requested object(s), they will be ignored.
       *
       * @example "<string>"
       */
      properties?: string;
      /**
       * A comma separated list of the properties to be returned along with their history of previous values. If any of the specified properties are not present on the requested object(s), they will be ignored. Usage of this parameter will reduce the maximum number of objects that can be read by a single request.
       *
       * @example "<string>"
       */
      propertiesWithHistory?: string;
      /**
       * A comma separated list of object types to retrieve associated IDs for. If any of the specified associations do not exist, they will be ignored.
       *
       * @example "<string>"
       */
      associations?: string;
      /**
       * Whether to return only results that have been archived.
       *
       * @example "false"
       */
      archived?: boolean;
    },
    params: RequestParams = {}
  ) =>
    this.request<object, string>({
      path: '/crm/v3/objects/discounts',
      method: 'GET',
      query,
      secure: true,
      format: 'json',
      ...params
    });
  /**
   *  Create a discount with the given properties and return a copy of the object, including the ID. Documentation and examples for creating standard discounts is provided.
   *
   * @tags Discounts API > Basic
   * @name V3ObjectsDiscountsCreate
   * @summary Create
   * @request POST:/crm/v3/objects/discounts
   * @secure
   */
  v3ObjectsDiscountsCreate = async (data: object, params: RequestParams = {}) =>
    this.request<object, string>({
      path: '/crm/v3/objects/discounts',
      method: 'POST',
      body: data,
      secure: true,
      type: ContentType.Json,
      format: 'json',
      ...params
    });
  /**
   * No description
   *
   * @tags Discounts API > Search
   * @name V3ObjectsDiscountsSearchCreate
   * @summary post-/crm/v3/objects/discounts/search
   * @request POST:/crm/v3/objects/discounts/search
   * @secure
   */
  v3ObjectsDiscountsSearchCreate = async (data: object, params: RequestParams = {}) =>
    this.request<object, string>({
      path: '/crm/v3/objects/discounts/search',
      method: 'POST',
      body: data,
      secure: true,
      type: ContentType.Json,
      format: 'json',
      ...params
    });
  /**
   * No description
   *
   * @tags Exports API > Public_Exports
   * @name V3ExportsExportAsyncTasksStatusDetail
   * @summary get-/crm/v3/exports/export/async/tasks/{task Id}/status
   * @request GET:/crm/v3/exports/export/async/tasks/{taskId}/status
   * @secure
   */
  v3ExportsExportAsyncTasksStatusDetail = async (taskId: string, params: RequestParams = {}) =>
    this.request<object, string>({
      path: `/crm/v3/exports/export/async/tasks/${taskId}/status`,
      method: 'GET',
      secure: true,
      format: 'json',
      ...params
    });
  /**
   *  Begins exporting CRM data for the portal as specified in the request body
   *
   * @tags Exports API > Core
   * @name V3ExportsExportAsyncCreate
   * @summary Start an export
   * @request POST:/crm/v3/exports/export/async
   * @secure
   */
  v3ExportsExportAsyncCreate = async (data: object, params: RequestParams = {}) =>
    this.request<object, string>({
      path: '/crm/v3/exports/export/async',
      method: 'POST',
      body: data,
      secure: true,
      type: ContentType.Json,
      format: 'json',
      ...params
    });
  /**
   * No description
   *
   * @tags Feedback Submissions API > Batch
   * @name V3ObjectsFeedbackSubmissionsBatchUpdateCreate
   * @summary Update a batch of feedback submissions by internal ID, or unique property values
   * @request POST:/crm/v3/objects/feedback_submissions/batch/update
   */
  v3ObjectsFeedbackSubmissionsBatchUpdateCreate = async (data: any, params: RequestParams = {}) =>
    this.request<object, string>({
      path: '/crm/v3/objects/feedback_submissions/batch/update',
      method: 'POST',
      body: data,
      format: 'json',
      ...params
    });
  /**
   * No description
   *
   * @tags Feedback Submissions API > Batch
   * @name V3ObjectsFeedbackSubmissionsBatchCreateCreate
   * @summary Create a batch of feedback submissions
   * @request POST:/crm/v3/objects/feedback_submissions/batch/create
   */
  v3ObjectsFeedbackSubmissionsBatchCreateCreate = async (
    data: object,
    params: RequestParams = {}
  ) =>
    this.request<object, string>({
      path: '/crm/v3/objects/feedback_submissions/batch/create',
      method: 'POST',
      body: data,
      type: ContentType.Json,
      format: 'json',
      ...params
    });
  /**
   * No description
   *
   * @tags Feedback Submissions API > Batch
   * @name V3ObjectsFeedbackSubmissionsBatchArchiveCreate
   * @summary Archive a batch of feedback submissions by ID
   * @request POST:/crm/v3/objects/feedback_submissions/batch/archive
   */
  v3ObjectsFeedbackSubmissionsBatchArchiveCreate = async (
    data: object,
    params: RequestParams = {}
  ) =>
    this.request<string, string>({
      path: '/crm/v3/objects/feedback_submissions/batch/archive',
      method: 'POST',
      body: data,
      type: ContentType.Json,
      ...params
    });
  /**
   * No description
   *
   * @tags Feedback Submissions API > Batch
   * @name V3ObjectsFeedbackSubmissionsBatchReadCreate
   * @summary Read a batch of feedback submissions by internal ID, or unique property values
   * @request POST:/crm/v3/objects/feedback_submissions/batch/read
   */
  v3ObjectsFeedbackSubmissionsBatchReadCreate = async (
    data: object,
    query?: {
      /**
       * Whether to return only results that have been archived.
       *
       * @example "false"
       */
      archived?: boolean;
    },
    params: RequestParams = {}
  ) =>
    this.request<object, string>({
      path: '/crm/v3/objects/feedback_submissions/batch/read',
      method: 'POST',
      query,
      body: data,
      type: ContentType.Json,
      format: 'json',
      ...params
    });
  /**
   *  Read an Object identified by `{feedbackSubmissionId}`. `{feedbackSubmissionId}` refers to the internal object ID by default, or optionally any unique property value as specified by the `idProperty` query param.  Control what is returned via the `properties` query param.
   *
   * @tags Feedback Submissions API > Basic
   * @name V3ObjectsFeedbackSubmissionsDetail
   * @summary Read
   * @request GET:/crm/v3/objects/feedback_submissions/{feedbackSubmissionId}
   */
  v3ObjectsFeedbackSubmissionsDetail = async (
    feedbackSubmissionId: string,
    query?: {
      /**
       * A comma separated list of the properties to be returned in the response. If any of the specified properties are not present on the requested object(s), they will be ignored.
       *
       * @example "<string>"
       */
      properties?: string;
      /**
       * A comma separated list of the properties to be returned along with their history of previous values. If any of the specified properties are not present on the requested object(s), they will be ignored.
       *
       * @example "<string>"
       */
      propertiesWithHistory?: string;
      /**
       * A comma separated list of object types to retrieve associated IDs for. If any of the specified associations do not exist, they will be ignored.
       *
       * @example "<string>"
       */
      associations?: string;
      /**
       * Whether to return only results that have been archived.
       *
       * @example "false"
       */
      archived?: boolean;
      /**
       * The name of a property whose values are unique for this object type
       *
       * @example "<string>"
       */
      idProperty?: string;
    },
    params: RequestParams = {}
  ) =>
    this.request<object, string>({
      path: `/crm/v3/objects/feedback_submissions/${feedbackSubmissionId}`,
      method: 'GET',
      query,
      format: 'json',
      ...params
    });
  /**
   *  Move an Object identified by `{feedbackSubmissionId}` to the recycling bin.
   *
   * @tags Feedback Submissions API > Basic
   * @name V3ObjectsFeedbackSubmissionsDelete
   * @summary Archive
   * @request DELETE:/crm/v3/objects/feedback_submissions/{feedbackSubmissionId}
   */
  v3ObjectsFeedbackSubmissionsDelete = async (
    feedbackSubmissionId: string,
    params: RequestParams = {}
  ) =>
    this.request<string, string>({
      path: `/crm/v3/objects/feedback_submissions/${feedbackSubmissionId}`,
      method: 'DELETE',
      ...params
    });
  /**
   *  Perform a partial update of an Object identified by `{feedbackSubmissionId}`. `{feedbackSubmissionId}` refers to the internal object ID by default, or optionally any unique property value as specified by the `idProperty` query param. Provided property values will be overwritten. Read-only and non-existent properties will be ignored. Properties values can be cleared by passing an empty string.
   *
   * @tags Feedback Submissions API > Basic
   * @name V3ObjectsFeedbackSubmissionsPartialUpdate
   * @summary Update
   * @request PATCH:/crm/v3/objects/feedback_submissions/{feedbackSubmissionId}
   */
  v3ObjectsFeedbackSubmissionsPartialUpdate = async (
    feedbackSubmissionId: string,
    data: object,
    query?: {
      /**
       * The name of a property whose values are unique for this object type
       *
       * @example "<string>"
       */
      idProperty?: string;
    },
    params: RequestParams = {}
  ) =>
    this.request<object, string>({
      path: `/crm/v3/objects/feedback_submissions/${feedbackSubmissionId}`,
      method: 'PATCH',
      query,
      body: data,
      type: ContentType.Json,
      format: 'json',
      ...params
    });
  /**
   *  Read a page of feedback submissions. Control what is returned via the `properties` query param.
   *
   * @tags Feedback Submissions API > Basic
   * @name V3ObjectsFeedbackSubmissionsList
   * @summary List
   * @request GET:/crm/v3/objects/feedback_submissions
   */
  v3ObjectsFeedbackSubmissionsList = async (
    query?: {
      /**
       * The maximum number of results to display per page.
       *
       * @example "10"
       */
      limit?: number;
      /**
       * The paging cursor token of the last successfully read resource will be returned as the `paging.next.after` JSON property of a paged response containing more results.
       *
       * @example "<string>"
       */
      after?: string;
      /**
       * A comma separated list of the properties to be returned in the response. If any of the specified properties are not present on the requested object(s), they will be ignored.
       *
       * @example "<string>"
       */
      properties?: string;
      /**
       * A comma separated list of the properties to be returned along with their history of previous values. If any of the specified properties are not present on the requested object(s), they will be ignored. Usage of this parameter will reduce the maximum number of objects that can be read by a single request.
       *
       * @example "<string>"
       */
      propertiesWithHistory?: string;
      /**
       * A comma separated list of object types to retrieve associated IDs for. If any of the specified associations do not exist, they will be ignored.
       *
       * @example "<string>"
       */
      associations?: string;
      /**
       * Whether to return only results that have been archived.
       *
       * @example "false"
       */
      archived?: boolean;
    },
    params: RequestParams = {}
  ) =>
    this.request<object, string>({
      path: '/crm/v3/objects/feedback_submissions',
      method: 'GET',
      query,
      format: 'json',
      ...params
    });
  /**
   *  Create a feedback submission with the given properties and return a copy of the object, including the ID. Documentation and examples for creating standard feedback submissions is provided.
   *
   * @tags Feedback Submissions API > Basic
   * @name V3ObjectsFeedbackSubmissionsCreate
   * @summary Create
   * @request POST:/crm/v3/objects/feedback_submissions
   */
  v3ObjectsFeedbackSubmissionsCreate = async (data: object, params: RequestParams = {}) =>
    this.request<object, string>({
      path: '/crm/v3/objects/feedback_submissions',
      method: 'POST',
      body: data,
      type: ContentType.Json,
      format: 'json',
      ...params
    });
  /**
   * No description
   *
   * @tags Feedback Submissions API > Search
   * @name V3ObjectsFeedbackSubmissionsSearchCreate
   * @summary post-/crm/v3/objects/feedback submissions/search do Search
   * @request POST:/crm/v3/objects/feedback_submissions/search
   */
  v3ObjectsFeedbackSubmissionsSearchCreate = async (data: any, params: RequestParams = {}) =>
    this.request<object, string>({
      path: '/crm/v3/objects/feedback_submissions/search',
      method: 'POST',
      body: data,
      format: 'json',
      ...params
    });
  /**
   * No description
   *
   * @tags Fees API > Batch
   * @name V3ObjectsFeesBatchCreateCreate
   * @summary Create a batch of fees
   * @request POST:/crm/v3/objects/fees/batch/create
   * @secure
   */
  v3ObjectsFeesBatchCreateCreate = async (data: object, params: RequestParams = {}) =>
    this.request<object, string>({
      path: '/crm/v3/objects/fees/batch/create',
      method: 'POST',
      body: data,
      secure: true,
      type: ContentType.Json,
      format: 'json',
      ...params
    });
  /**
   * No description
   *
   * @tags Fees API > Batch
   * @name V3ObjectsFeesBatchUpdateCreate
   * @summary Update a batch of fees
   * @request POST:/crm/v3/objects/fees/batch/update
   * @secure
   */
  v3ObjectsFeesBatchUpdateCreate = async (data: object, params: RequestParams = {}) =>
    this.request<object, string>({
      path: '/crm/v3/objects/fees/batch/update',
      method: 'POST',
      body: data,
      secure: true,
      type: ContentType.Json,
      format: 'json',
      ...params
    });
  /**
   * No description
   *
   * @tags Fees API > Batch
   * @name V3ObjectsFeesBatchArchiveCreate
   * @summary Archive a batch of fees by ID
   * @request POST:/crm/v3/objects/fees/batch/archive
   * @secure
   */
  v3ObjectsFeesBatchArchiveCreate = async (data: object, params: RequestParams = {}) =>
    this.request<string, string>({
      path: '/crm/v3/objects/fees/batch/archive',
      method: 'POST',
      body: data,
      secure: true,
      type: ContentType.Json,
      ...params
    });
  /**
   * No description
   *
   * @tags Fees API > Batch
   * @name V3ObjectsFeesBatchReadCreate
   * @summary Read a batch of fees by internal ID, or unique property values
   * @request POST:/crm/v3/objects/fees/batch/read
   * @secure
   */
  v3ObjectsFeesBatchReadCreate = async (
    data: object,
    query?: {
      /**
       * Whether to return only results that have been archived.
       *
       * @example "false"
       */
      archived?: boolean;
    },
    params: RequestParams = {}
  ) =>
    this.request<object, string>({
      path: '/crm/v3/objects/fees/batch/read',
      method: 'POST',
      query,
      body: data,
      secure: true,
      type: ContentType.Json,
      format: 'json',
      ...params
    });
  /**
   *  Read an Object identified by `{feeId}`. `{feeId}` refers to the internal object ID by default, or optionally any unique property value as specified by the `idProperty` query param.  Control what is returned via the `properties` query param.
   *
   * @tags Fees API > Basic
   * @name V3ObjectsFeesDetail
   * @summary Read
   * @request GET:/crm/v3/objects/fees/{feeId}
   * @secure
   */
  v3ObjectsFeesDetail = async (
    feeId: string,
    query?: {
      /**
       * A comma separated list of the properties to be returned in the response. If any of the specified properties are not present on the requested object(s), they will be ignored.
       *
       * @example "<string>"
       */
      properties?: string;
      /**
       * A comma separated list of the properties to be returned along with their history of previous values. If any of the specified properties are not present on the requested object(s), they will be ignored.
       *
       * @example "<string>"
       */
      propertiesWithHistory?: string;
      /**
       * A comma separated list of object types to retrieve associated IDs for. If any of the specified associations do not exist, they will be ignored.
       *
       * @example "<string>"
       */
      associations?: string;
      /**
       * Whether to return only results that have been archived.
       *
       * @example "false"
       */
      archived?: boolean;
      /**
       * The name of a property whose values are unique for this object type
       *
       * @example "<string>"
       */
      idProperty?: string;
    },
    params: RequestParams = {}
  ) =>
    this.request<object, string>({
      path: `/crm/v3/objects/fees/${feeId}`,
      method: 'GET',
      query,
      secure: true,
      format: 'json',
      ...params
    });
  /**
   *  Move an Object identified by `{feeId}` to the recycling bin.
   *
   * @tags Fees API > Basic
   * @name V3ObjectsFeesDelete
   * @summary Archive
   * @request DELETE:/crm/v3/objects/fees/{feeId}
   * @secure
   */
  v3ObjectsFeesDelete = async (feeId: string, params: RequestParams = {}) =>
    this.request<string, string>({
      path: `/crm/v3/objects/fees/${feeId}`,
      method: 'DELETE',
      secure: true,
      ...params
    });
  /**
   *  Perform a partial update of an Object identified by `{feeId}`. `{feeId}` refers to the internal object ID by default, or optionally any unique property value as specified by the `idProperty` query param. Provided property values will be overwritten. Read-only and non-existent properties will be ignored. Properties values can be cleared by passing an empty string.
   *
   * @tags Fees API > Basic
   * @name V3ObjectsFeesPartialUpdate
   * @summary Update
   * @request PATCH:/crm/v3/objects/fees/{feeId}
   * @secure
   */
  v3ObjectsFeesPartialUpdate = async (
    feeId: string,
    data: object,
    query?: {
      /**
       * The name of a property whose values are unique for this object type
       *
       * @example "<string>"
       */
      idProperty?: string;
    },
    params: RequestParams = {}
  ) =>
    this.request<object, string>({
      path: `/crm/v3/objects/fees/${feeId}`,
      method: 'PATCH',
      query,
      body: data,
      secure: true,
      type: ContentType.Json,
      format: 'json',
      ...params
    });
  /**
   *  Read a page of fees. Control what is returned via the `properties` query param.
   *
   * @tags Fees API > Basic
   * @name V3ObjectsFeesList
   * @summary List
   * @request GET:/crm/v3/objects/fees
   * @secure
   */
  v3ObjectsFeesList = async (
    query?: {
      /**
       * The maximum number of results to display per page.
       *
       * @example "10"
       */
      limit?: number;
      /**
       * The paging cursor token of the last successfully read resource will be returned as the `paging.next.after` JSON property of a paged response containing more results.
       *
       * @example "<string>"
       */
      after?: string;
      /**
       * A comma separated list of the properties to be returned in the response. If any of the specified properties are not present on the requested object(s), they will be ignored.
       *
       * @example "<string>"
       */
      properties?: string;
      /**
       * A comma separated list of the properties to be returned along with their history of previous values. If any of the specified properties are not present on the requested object(s), they will be ignored. Usage of this parameter will reduce the maximum number of objects that can be read by a single request.
       *
       * @example "<string>"
       */
      propertiesWithHistory?: string;
      /**
       * A comma separated list of object types to retrieve associated IDs for. If any of the specified associations do not exist, they will be ignored.
       *
       * @example "<string>"
       */
      associations?: string;
      /**
       * Whether to return only results that have been archived.
       *
       * @example "false"
       */
      archived?: boolean;
    },
    params: RequestParams = {}
  ) =>
    this.request<object, string>({
      path: '/crm/v3/objects/fees',
      method: 'GET',
      query,
      secure: true,
      format: 'json',
      ...params
    });
  /**
   *  Create a fee with the given properties and return a copy of the object, including the ID. Documentation and examples for creating standard fees is provided.
   *
   * @tags Fees API > Basic
   * @name V3ObjectsFeesCreate
   * @summary Create
   * @request POST:/crm/v3/objects/fees
   * @secure
   */
  v3ObjectsFeesCreate = async (data: object, params: RequestParams = {}) =>
    this.request<object, string>({
      path: '/crm/v3/objects/fees',
      method: 'POST',
      body: data,
      secure: true,
      type: ContentType.Json,
      format: 'json',
      ...params
    });
  /**
   * No description
   *
   * @tags Fees API > Public_Object
   * @name V3ObjectsFeesMergeCreate
   * @summary Merge two fees with same type
   * @request POST:/crm/v3/objects/fees/merge
   * @secure
   */
  v3ObjectsFeesMergeCreate = async (data: object, params: RequestParams = {}) =>
    this.request<object, string>({
      path: '/crm/v3/objects/fees/merge',
      method: 'POST',
      body: data,
      secure: true,
      type: ContentType.Json,
      format: 'json',
      ...params
    });
  /**
   *  Permanently delete a contact and all associated content to follow GDPR. Use optional property 'idProperty' set to 'email' to identify contact by email address. If email address is not found, the email address will be added to a blocklist and prevent it from being used in the future.
   *
   * @tags Fees API > GDPR
   * @name V3ObjectsFeesGdprDeleteCreate
   * @summary GDPR DELETE
   * @request POST:/crm/v3/objects/fees/gdpr-delete
   * @secure
   */
  v3ObjectsFeesGdprDeleteCreate = async (data: object, params: RequestParams = {}) =>
    this.request<string, string>({
      path: '/crm/v3/objects/fees/gdpr-delete',
      method: 'POST',
      body: data,
      secure: true,
      type: ContentType.Json,
      ...params
    });
  /**
   * No description
   *
   * @tags Fees API > Search
   * @name V3ObjectsFeesSearchCreate
   * @summary post-/crm/v3/objects/fees/search
   * @request POST:/crm/v3/objects/fees/search
   * @secure
   */
  v3ObjectsFeesSearchCreate = async (data: object, params: RequestParams = {}) =>
    this.request<object, string>({
      path: '/crm/v3/objects/fees/search',
      method: 'POST',
      body: data,
      secure: true,
      type: ContentType.Json,
      format: 'json',
      ...params
    });
  /**
   * No description
   *
   * @tags Goals API > Batch
   * @name V3ObjectsGoalTargetsBatchReadCreate
   * @summary Read a batch of goal targets by internal ID, or unique property values
   * @request POST:/crm/v3/objects/goal_targets/batch/read
   */
  v3ObjectsGoalTargetsBatchReadCreate = async (
    data: object,
    query?: {
      /**
       * Whether to return only results that have been archived.
       *
       * @example "false"
       */
      archived?: boolean;
    },
    params: RequestParams = {}
  ) =>
    this.request<object, string>({
      path: '/crm/v3/objects/goal_targets/batch/read',
      method: 'POST',
      query,
      body: data,
      type: ContentType.Json,
      format: 'json',
      ...params
    });
  /**
   *  Read an Object identified by `{goalTargetId}`. `{goalTargetId}` refers to the internal object ID by default, or optionally any unique property value as specified by the `idProperty` query param.  Control what is returned via the `properties` query param.
   *
   * @tags Goals API > Basic
   * @name V3ObjectsGoalTargetsDetail
   * @summary Read
   * @request GET:/crm/v3/objects/goal_targets/{goalTargetId}
   */
  v3ObjectsGoalTargetsDetail = async (
    goalTargetId: string,
    query?: {
      /**
       * A comma separated list of the properties to be returned in the response. If any of the specified properties are not present on the requested object(s), they will be ignored.
       *
       * @example "<string>"
       */
      properties?: string;
      /**
       * A comma separated list of the properties to be returned along with their history of previous values. If any of the specified properties are not present on the requested object(s), they will be ignored.
       *
       * @example "<string>"
       */
      propertiesWithHistory?: string;
      /**
       * A comma separated list of object types to retrieve associated IDs for. If any of the specified associations do not exist, they will be ignored.
       *
       * @example "<string>"
       */
      associations?: string;
      /**
       * Whether to return only results that have been archived.
       *
       * @example "false"
       */
      archived?: boolean;
      /**
       * The name of a property whose values are unique for this object type
       *
       * @example "<string>"
       */
      idProperty?: string;
    },
    params: RequestParams = {}
  ) =>
    this.request<object, string>({
      path: `/crm/v3/objects/goal_targets/${goalTargetId}`,
      method: 'GET',
      query,
      format: 'json',
      ...params
    });
  /**
   *  Read a page of goal targets. Control what is returned via the `properties` query param.
   *
   * @tags Goals API > Basic
   * @name V3ObjectsGoalTargetsList
   * @summary List
   * @request GET:/crm/v3/objects/goal_targets
   */
  v3ObjectsGoalTargetsList = async (
    query?: {
      /**
       * The maximum number of results to display per page.
       *
       * @example "10"
       */
      limit?: number;
      /**
       * The paging cursor token of the last successfully read resource will be returned as the `paging.next.after` JSON property of a paged response containing more results.
       *
       * @example "<string>"
       */
      after?: string;
      /**
       * A comma separated list of the properties to be returned in the response. If any of the specified properties are not present on the requested object(s), they will be ignored.
       *
       * @example "<string>"
       */
      properties?: string;
      /**
       * A comma separated list of the properties to be returned along with their history of previous values. If any of the specified properties are not present on the requested object(s), they will be ignored. Usage of this parameter will reduce the maximum number of objects that can be read by a single request.
       *
       * @example "<string>"
       */
      propertiesWithHistory?: string;
      /**
       * A comma separated list of object types to retrieve associated IDs for. If any of the specified associations do not exist, they will be ignored.
       *
       * @example "<string>"
       */
      associations?: string;
      /**
       * Whether to return only results that have been archived.
       *
       * @example "false"
       */
      archived?: boolean;
    },
    params: RequestParams = {}
  ) =>
    this.request<object, string>({
      path: '/crm/v3/objects/goal_targets',
      method: 'GET',
      query,
      format: 'json',
      ...params
    });
  /**
   * No description
   *
   * @tags Goals API > Search
   * @name V3ObjectsGoalTargetsSearchCreate
   * @summary post-/crm/v3/objects/goal targets/search do Search
   * @request POST:/crm/v3/objects/goal_targets/search
   */
  v3ObjectsGoalTargetsSearchCreate = async (data: any, params: RequestParams = {}) =>
    this.request<object, string>({
      path: '/crm/v3/objects/goal_targets/search',
      method: 'POST',
      body: data,
      format: 'json',
      ...params
    });
  /**
   *  A complete summary of an import record, including any updates.
   *
   * @tags Imports API > Core
   * @name V3ImportsDetail
   * @summary Get the information on any import
   * @request GET:/crm/v3/imports/{importId}
   * @secure
   */
  v3ImportsDetail = async (importId: string, params: RequestParams = {}) =>
    this.request<object, string>({
      path: `/crm/v3/imports/${importId}`,
      method: 'GET',
      secure: true,
      format: 'json',
      ...params
    });
  /**
   *  This allows a developer to cancel an active import.
   *
   * @tags Imports API > Core
   * @name V3ImportsCancelCreate
   * @summary Cancel an active import
   * @request POST:/crm/v3/imports/{importId}/cancel
   * @secure
   */
  v3ImportsCancelCreate = async (importId: string, data: any, params: RequestParams = {}) =>
    this.request<object, string>({
      path: `/crm/v3/imports/${importId}/cancel`,
      method: 'POST',
      body: data,
      secure: true,
      format: 'json',
      ...params
    });
  /**
   *  Returns a paged list of active imports for this account.
   *
   * @tags Imports API > Core
   * @name V3ImportsList
   * @summary Get active imports
   * @request GET:/crm/v3/imports/
   * @secure
   */
  v3ImportsList = async (
    query?: {
      /**
       * The paging cursor token of the last successfully read resource will be returned as the `paging.next.after` JSON property of a paged response containing more results.
       *
       * @example "<string>"
       */
      after?: string;
      /** @example "<string>" */
      before?: string;
      /**
       * The maximum number of results to display per page.
       *
       * @example "<integer>"
       */
      limit?: string;
    },
    params: RequestParams = {}
  ) =>
    this.request<object, string>({
      path: '/crm/v3/imports/',
      method: 'GET',
      query,
      secure: true,
      format: 'json',
      ...params
    });
  /**
   *  Begins importing data from the specified file resources. This uploads the corresponding file and uses the import request object to convert rows in the files to objects.
   *
   * @tags Imports API > Core
   * @name V3ImportsCreate
   * @summary Start a new import
   * @request POST:/crm/v3/imports/
   * @secure
   */
  v3ImportsCreate = async (
    data: {
      /**
       * A list of files containing the data to import
       *
       * @example "<string>"
       */
      files?: string;
      /**
       * JSON formatted metadata about the import. This includes a name for the import and the column mappings for each file. See the overview tab for more on the required format.
       *
       * @example "<string>"
       */
      importRequest?: string;
    },
    params: RequestParams = {}
  ) =>
    this.request<object, string>({
      path: '/crm/v3/imports/',
      method: 'POST',
      body: data,
      secure: true,
      type: ContentType.FormData,
      format: 'json',
      ...params
    });
  /**
   * No description
   *
   * @tags Imports API > Public_Imports
   * @name V3ImportsErrorsDetail
   * @summary get-/crm/v3/imports/{import Id}/errors get Errors
   * @request GET:/crm/v3/imports/{importId}/errors
   * @secure
   */
  v3ImportsErrorsDetail = async (
    importId: string,
    query?: {
      /**
       * The paging cursor token of the last successfully read resource will be returned as the `paging.next.after` JSON property of a paged response containing more results.
       *
       * @example "<string>"
       */
      after?: string;
      /**
       * The maximum number of results to display per page.
       *
       * @example "<integer>"
       */
      limit?: string;
    },
    params: RequestParams = {}
  ) =>
    this.request<object, string>({
      path: `/crm/v3/imports/${importId}/errors`,
      method: 'GET',
      query,
      secure: true,
      format: 'json',
      ...params
    });
  /**
   * No description
   *
   * @tags Leads API > Batch
   * @name V3ObjectsLeadsBatchReadCreate
   * @summary Read a batch of leads by internal ID, or unique property values
   * @request POST:/crm/v3/objects/leads/batch/read
   * @secure
   */
  v3ObjectsLeadsBatchReadCreate = async (
    data: object,
    query?: {
      /**
       * Whether to return only results that have been archived.
       *
       * @example "false"
       */
      archived?: boolean;
    },
    params: RequestParams = {}
  ) =>
    this.request<object, string>({
      path: '/crm/v3/objects/leads/batch/read',
      method: 'POST',
      query,
      body: data,
      secure: true,
      type: ContentType.Json,
      format: 'json',
      ...params
    });
  /**
   * No description
   *
   * @tags Leads API > Batch
   * @name V3ObjectsLeadsBatchArchiveCreate
   * @summary Archive a batch of leads by ID
   * @request POST:/crm/v3/objects/leads/batch/archive
   * @secure
   */
  v3ObjectsLeadsBatchArchiveCreate = async (data: object, params: RequestParams = {}) =>
    this.request<string, string>({
      path: '/crm/v3/objects/leads/batch/archive',
      method: 'POST',
      body: data,
      secure: true,
      type: ContentType.Json,
      ...params
    });
  /**
   * No description
   *
   * @tags Leads API > Batch
   * @name V3ObjectsLeadsBatchCreateCreate
   * @summary Create a batch of leads
   * @request POST:/crm/v3/objects/leads/batch/create
   * @secure
   */
  v3ObjectsLeadsBatchCreateCreate = async (data: object, params: RequestParams = {}) =>
    this.request<object, string>({
      path: '/crm/v3/objects/leads/batch/create',
      method: 'POST',
      body: data,
      secure: true,
      type: ContentType.Json,
      format: 'json',
      ...params
    });
  /**
   * No description
   *
   * @tags Leads API > Batch
   * @name V3ObjectsLeadsBatchUpdateCreate
   * @summary Update a batch of leads
   * @request POST:/crm/v3/objects/leads/batch/update
   * @secure
   */
  v3ObjectsLeadsBatchUpdateCreate = async (data: object, params: RequestParams = {}) =>
    this.request<object, string>({
      path: '/crm/v3/objects/leads/batch/update',
      method: 'POST',
      body: data,
      secure: true,
      type: ContentType.Json,
      format: 'json',
      ...params
    });
  /**
   *  Read an Object identified by `{leadsId}`. `{leadsId}` refers to the internal object ID by default, or optionally any unique property value as specified by the `idProperty` query param.  Control what is returned via the `properties` query param.
   *
   * @tags Leads API > Basic
   * @name V3ObjectsLeadsDetail
   * @summary Read
   * @request GET:/crm/v3/objects/leads/{leadsId}
   * @secure
   */
  v3ObjectsLeadsDetail = async (
    leadsId: string,
    query?: {
      /**
       * A comma separated list of the properties to be returned in the response. If any of the specified properties are not present on the requested object(s), they will be ignored.
       *
       * @example "<string>"
       */
      properties?: string;
      /**
       * A comma separated list of the properties to be returned along with their history of previous values. If any of the specified properties are not present on the requested object(s), they will be ignored.
       *
       * @example "<string>"
       */
      propertiesWithHistory?: string;
      /**
       * A comma separated list of object types to retrieve associated IDs for. If any of the specified associations do not exist, they will be ignored.
       *
       * @example "<string>"
       */
      associations?: string;
      /**
       * Whether to return only results that have been archived.
       *
       * @example "false"
       */
      archived?: boolean;
      /**
       * The name of a property whose values are unique for this object type
       *
       * @example "<string>"
       */
      idProperty?: string;
    },
    params: RequestParams = {}
  ) =>
    this.request<object, string>({
      path: `/crm/v3/objects/leads/${leadsId}`,
      method: 'GET',
      query,
      secure: true,
      format: 'json',
      ...params
    });
  /**
   *  Move an Object identified by `{leadsId}` to the recycling bin.
   *
   * @tags Leads API > Basic
   * @name V3ObjectsLeadsDelete
   * @summary Archive
   * @request DELETE:/crm/v3/objects/leads/{leadsId}
   * @secure
   */
  v3ObjectsLeadsDelete = async (leadsId: string, params: RequestParams = {}) =>
    this.request<string, string>({
      path: `/crm/v3/objects/leads/${leadsId}`,
      method: 'DELETE',
      secure: true,
      ...params
    });
  /**
   *  Perform a partial update of an Object identified by `{leadsId}`. `{leadsId}` refers to the internal object ID by default, or optionally any unique property value as specified by the `idProperty` query param. Provided property values will be overwritten. Read-only and non-existent properties will be ignored. Properties values can be cleared by passing an empty string.
   *
   * @tags Leads API > Basic
   * @name V3ObjectsLeadsPartialUpdate
   * @summary Update
   * @request PATCH:/crm/v3/objects/leads/{leadsId}
   * @secure
   */
  v3ObjectsLeadsPartialUpdate = async (
    leadsId: string,
    data: object,
    query?: {
      /**
       * The name of a property whose values are unique for this object type
       *
       * @example "<string>"
       */
      idProperty?: string;
    },
    params: RequestParams = {}
  ) =>
    this.request<object, string>({
      path: `/crm/v3/objects/leads/${leadsId}`,
      method: 'PATCH',
      query,
      body: data,
      secure: true,
      type: ContentType.Json,
      format: 'json',
      ...params
    });
  /**
   *  Read a page of leads. Control what is returned via the `properties` query param.
   *
   * @tags Leads API > Basic
   * @name V3ObjectsLeadsList
   * @summary List
   * @request GET:/crm/v3/objects/leads
   * @secure
   */
  v3ObjectsLeadsList = async (
    query?: {
      /**
       * The maximum number of results to display per page.
       *
       * @example "10"
       */
      limit?: number;
      /**
       * The paging cursor token of the last successfully read resource will be returned as the `paging.next.after` JSON property of a paged response containing more results.
       *
       * @example "<string>"
       */
      after?: string;
      /**
       * A comma separated list of the properties to be returned in the response. If any of the specified properties are not present on the requested object(s), they will be ignored.
       *
       * @example "<string>"
       */
      properties?: string;
      /**
       * A comma separated list of the properties to be returned along with their history of previous values. If any of the specified properties are not present on the requested object(s), they will be ignored. Usage of this parameter will reduce the maximum number of objects that can be read by a single request.
       *
       * @example "<string>"
       */
      propertiesWithHistory?: string;
      /**
       * A comma separated list of object types to retrieve associated IDs for. If any of the specified associations do not exist, they will be ignored.
       *
       * @example "<string>"
       */
      associations?: string;
      /**
       * Whether to return only results that have been archived.
       *
       * @example "false"
       */
      archived?: boolean;
    },
    params: RequestParams = {}
  ) =>
    this.request<object, string>({
      path: '/crm/v3/objects/leads',
      method: 'GET',
      query,
      secure: true,
      format: 'json',
      ...params
    });
  /**
   *  Create a lead with the given properties and return a copy of the object, including the ID. Documentation and examples for creating standard leads is provided.
   *
   * @tags Leads API > Basic
   * @name V3ObjectsLeadsCreate
   * @summary Create
   * @request POST:/crm/v3/objects/leads
   * @secure
   */
  v3ObjectsLeadsCreate = async (data: object, params: RequestParams = {}) =>
    this.request<object, string>({
      path: '/crm/v3/objects/leads',
      method: 'POST',
      body: data,
      secure: true,
      type: ContentType.Json,
      format: 'json',
      ...params
    });
  /**
   * No description
   *
   * @tags Leads API > Search
   * @name V3ObjectsLeadsSearchCreate
   * @summary post-/crm/v3/objects/leads/search
   * @request POST:/crm/v3/objects/leads/search
   * @secure
   */
  v3ObjectsLeadsSearchCreate = async (data: object, params: RequestParams = {}) =>
    this.request<object, string>({
      path: '/crm/v3/objects/leads/search',
      method: 'POST',
      body: data,
      secure: true,
      type: ContentType.Json,
      format: 'json',
      ...params
    });
  /**
   * No description
   *
   * @tags Line Items API > Batch
   * @name V3ObjectsLineItemsBatchCreateCreate
   * @summary Create a batch of line items
   * @request POST:/crm/v3/objects/line_items/batch/create
   * @secure
   */
  v3ObjectsLineItemsBatchCreateCreate = async (data: object, params: RequestParams = {}) =>
    this.request<object, string>({
      path: '/crm/v3/objects/line_items/batch/create',
      method: 'POST',
      body: data,
      secure: true,
      type: ContentType.Json,
      format: 'json',
      ...params
    });
  /**
   * No description
   *
   * @tags Line Items API > Batch
   * @name V3ObjectsLineItemsBatchUpdateCreate
   * @summary Update a batch of line items by internal ID, or unique property values
   * @request POST:/crm/v3/objects/line_items/batch/update
   * @secure
   */
  v3ObjectsLineItemsBatchUpdateCreate = async (data: any, params: RequestParams = {}) =>
    this.request<object, string>({
      path: '/crm/v3/objects/line_items/batch/update',
      method: 'POST',
      body: data,
      secure: true,
      format: 'json',
      ...params
    });
  /**
   * No description
   *
   * @tags Line Items API > Batch
   * @name V3ObjectsLineItemsBatchArchiveCreate
   * @summary Archive a batch of line items by ID
   * @request POST:/crm/v3/objects/line_items/batch/archive
   * @secure
   */
  v3ObjectsLineItemsBatchArchiveCreate = async (data: object, params: RequestParams = {}) =>
    this.request<string, string>({
      path: '/crm/v3/objects/line_items/batch/archive',
      method: 'POST',
      body: data,
      secure: true,
      type: ContentType.Json,
      ...params
    });
  /**
   * No description
   *
   * @tags Line Items API > Batch
   * @name V3ObjectsLineItemsBatchReadCreate
   * @summary Read a batch of line items by internal ID, or unique property values
   * @request POST:/crm/v3/objects/line_items/batch/read
   * @secure
   */
  v3ObjectsLineItemsBatchReadCreate = async (
    data: object,
    query?: {
      /**
       * Whether to return only results that have been archived.
       *
       * @example "false"
       */
      archived?: boolean;
    },
    params: RequestParams = {}
  ) =>
    this.request<object, string>({
      path: '/crm/v3/objects/line_items/batch/read',
      method: 'POST',
      query,
      body: data,
      secure: true,
      type: ContentType.Json,
      format: 'json',
      ...params
    });
  /**
   *  Read a page of line items. Control what is returned via the `properties` query param.
   *
   * @tags Line Items API > Basic
   * @name V3ObjectsLineItemsList
   * @summary List
   * @request GET:/crm/v3/objects/line_items
   * @secure
   */
  v3ObjectsLineItemsList = async (
    query?: {
      /**
       * The maximum number of results to display per page.
       *
       * @example "10"
       */
      limit?: number;
      /**
       * The paging cursor token of the last successfully read resource will be returned as the `paging.next.after` JSON property of a paged response containing more results.
       *
       * @example "<string>"
       */
      after?: string;
      /**
       * A comma separated list of the properties to be returned in the response. If any of the specified properties are not present on the requested object(s), they will be ignored.
       *
       * @example "<string>"
       */
      properties?: string;
      /**
       * A comma separated list of the properties to be returned along with their history of previous values. If any of the specified properties are not present on the requested object(s), they will be ignored. Usage of this parameter will reduce the maximum number of objects that can be read by a single request.
       *
       * @example "<string>"
       */
      propertiesWithHistory?: string;
      /**
       * A comma separated list of object types to retrieve associated IDs for. If any of the specified associations do not exist, they will be ignored.
       *
       * @example "<string>"
       */
      associations?: string;
      /**
       * Whether to return only results that have been archived.
       *
       * @example "false"
       */
      archived?: boolean;
    },
    params: RequestParams = {}
  ) =>
    this.request<object, string>({
      path: '/crm/v3/objects/line_items',
      method: 'GET',
      query,
      secure: true,
      format: 'json',
      ...params
    });
  /**
   *  Create a line item with the given properties and return a copy of the object, including the ID. Documentation and examples for creating standard line items is provided.
   *
   * @tags Line Items API > Basic
   * @name V3ObjectsLineItemsCreate
   * @summary Create
   * @request POST:/crm/v3/objects/line_items
   * @secure
   */
  v3ObjectsLineItemsCreate = async (data: object, params: RequestParams = {}) =>
    this.request<object, string>({
      path: '/crm/v3/objects/line_items',
      method: 'POST',
      body: data,
      secure: true,
      type: ContentType.Json,
      format: 'json',
      ...params
    });
  /**
   *  Read an Object identified by `{lineItemId}`. `{lineItemId}` refers to the internal object ID by default, or optionally any unique property value as specified by the `idProperty` query param.  Control what is returned via the `properties` query param.
   *
   * @tags Line Items API > Basic
   * @name V3ObjectsLineItemsDetail
   * @summary Read
   * @request GET:/crm/v3/objects/line_items/{lineItemId}
   * @secure
   */
  v3ObjectsLineItemsDetail = async (
    lineItemId: string,
    query?: {
      /**
       * A comma separated list of the properties to be returned in the response. If any of the specified properties are not present on the requested object(s), they will be ignored.
       *
       * @example "<string>"
       */
      properties?: string;
      /**
       * A comma separated list of the properties to be returned along with their history of previous values. If any of the specified properties are not present on the requested object(s), they will be ignored.
       *
       * @example "<string>"
       */
      propertiesWithHistory?: string;
      /**
       * A comma separated list of object types to retrieve associated IDs for. If any of the specified associations do not exist, they will be ignored.
       *
       * @example "<string>"
       */
      associations?: string;
      /**
       * Whether to return only results that have been archived.
       *
       * @example "false"
       */
      archived?: boolean;
      /**
       * The name of a property whose values are unique for this object type
       *
       * @example "<string>"
       */
      idProperty?: string;
    },
    params: RequestParams = {}
  ) =>
    this.request<object, string>({
      path: `/crm/v3/objects/line_items/${lineItemId}`,
      method: 'GET',
      query,
      secure: true,
      format: 'json',
      ...params
    });
  /**
   *  Move an Object identified by `{lineItemId}` to the recycling bin.
   *
   * @tags Line Items API > Basic
   * @name V3ObjectsLineItemsDelete
   * @summary Archive
   * @request DELETE:/crm/v3/objects/line_items/{lineItemId}
   * @secure
   */
  v3ObjectsLineItemsDelete = async (lineItemId: string, params: RequestParams = {}) =>
    this.request<string, string>({
      path: `/crm/v3/objects/line_items/${lineItemId}`,
      method: 'DELETE',
      secure: true,
      ...params
    });
  /**
   *  Perform a partial update of an Object identified by `{lineItemId}`. `{lineItemId}` refers to the internal object ID by default, or optionally any unique property value as specified by the `idProperty` query param. Provided property values will be overwritten. Read-only and non-existent properties will be ignored. Properties values can be cleared by passing an empty string.
   *
   * @tags Line Items API > Basic
   * @name V3ObjectsLineItemsPartialUpdate
   * @summary Update
   * @request PATCH:/crm/v3/objects/line_items/{lineItemId}
   * @secure
   */
  v3ObjectsLineItemsPartialUpdate = async (
    lineItemId: string,
    data: object,
    query?: {
      /**
       * The name of a property whose values are unique for this object type
       *
       * @example "<string>"
       */
      idProperty?: string;
    },
    params: RequestParams = {}
  ) =>
    this.request<object, string>({
      path: `/crm/v3/objects/line_items/${lineItemId}`,
      method: 'PATCH',
      query,
      body: data,
      secure: true,
      type: ContentType.Json,
      format: 'json',
      ...params
    });
  /**
   * No description
   *
   * @tags Line Items API > Search
   * @name V3ObjectsLineItemsSearchCreate
   * @summary post-/crm/v3/objects/line items/search do Search
   * @request POST:/crm/v3/objects/line_items/search
   * @secure
   */
  v3ObjectsLineItemsSearchCreate = async (data: any, params: RequestParams = {}) =>
    this.request<object, string>({
      path: '/crm/v3/objects/line_items/search',
      method: 'POST',
      body: data,
      secure: true,
      format: 'json',
      ...params
    });
  /**
   *  Add and/or remove records that have already been created in the system to and/or from a list. This endpoint only works for lists that have a `processingType` of `MANUAL` or `SNAPSHOT`.
   *
   * @tags Lists API > Memberships
   * @name V3ListsMembershipsAddAndRemoveUpdate
   * @summary Add and/or Remove Records from a List
   * @request PUT:/crm/v3/lists/{listId}/memberships/add-and-remove
   * @secure
   */
  v3ListsMembershipsAddAndRemoveUpdate = async (
    listId: string,
    data: object,
    params: RequestParams = {}
  ) =>
    this.request<object, string>({
      path: `/crm/v3/lists/${listId}/memberships/add-and-remove`,
      method: 'PUT',
      body: data,
      secure: true,
      type: ContentType.Json,
      format: 'json',
      ...params
    });
  /**
   *  Add the records provided to the list. Records that do not exist or that are already members of the list are ignored. This endpoint only works for lists that have a `processingType` of `MANUAL` or `SNAPSHOT`.
   *
   * @tags Lists API > Memberships
   * @name V3ListsMembershipsAddUpdate
   * @summary Add Records to a List
   * @request PUT:/crm/v3/lists/{listId}/memberships/add
   * @secure
   */
  v3ListsMembershipsAddUpdate = async (listId: string, data: object, params: RequestParams = {}) =>
    this.request<object, string>({
      path: `/crm/v3/lists/${listId}/memberships/add`,
      method: 'PUT',
      body: data,
      secure: true,
      type: ContentType.Json,
      format: 'json',
      ...params
    });
  /**
   *  Add all of the records from a *source list* (specified by the `sourceListId`) to a *destination list* (specified by the `listId`). Records that are already members of the *destination list* will be ignored. The *destination* and *source list* IDs must be different. The *destination* and *source lists* must contain records of the same type (e.g. contacts, companies, etc.). This endpoint only works for *destination lists* that have a `processingType` of `MANUAL` or `SNAPSHOT`. The *source list* can have any `processingType`.
   *
   * @tags Lists API > Memberships
   * @name V3ListsMembershipsAddFromUpdate
   * @summary Add All Records from a Source List to a Destination List
   * @request PUT:/crm/v3/lists/{listId}/memberships/add-from/{sourceListId}
   * @secure
   */
  v3ListsMembershipsAddFromUpdate = async (
    listId: string,
    sourceListId: string,
    data: any,
    params: RequestParams = {}
  ) =>
    this.request<string, string>({
      path: `/crm/v3/lists/${listId}/memberships/add-from/${sourceListId}`,
      method: 'PUT',
      body: data,
      secure: true,
      ...params
    });
  /**
   *  Fetch the memberships of a list in order sorted by the `recordId` of the records in the list. The `recordId`s are sorted in *ascending* order if an `after` offset or no offset is provided. If only a `before` offset is provided, then the records are sorted in *descending* order. The `after` offset parameter will take precedence over the `before` offset in a case where both are provided.
   *
   * @tags Lists API > Memberships
   * @name V3ListsMembershipsDetail
   * @summary Fetch List Memberships Ordered by ID
   * @request GET:/crm/v3/lists/{listId}/memberships
   * @secure
   */
  v3ListsMembershipsDetail = async (
    listId: string,
    query?: {
      /**
       * The paging offset token for the page that comes `after` the previously requested records.
       *
       * If provided, then the records in the response will be the records following the offset, sorted in *ascending* order. Takes precedence over the `before` offset.
       *
       * @example "<string>"
       */
      after?: string;
      /**
       * The paging offset token for the page that comes `before` the previously requested records.
       *
       * If provided, then the records in the response will be the records preceding the offset, sorted in *descending* order.
       *
       * @example "<string>"
       */
      before?: string;
      /**
       * The number of records to return in the response. The maximum `limit` is 250.
       *
       * @example "100"
       */
      limit?: number;
    },
    params: RequestParams = {}
  ) =>
    this.request<object, string>({
      path: `/crm/v3/lists/${listId}/memberships`,
      method: 'GET',
      query,
      secure: true,
      format: 'json',
      ...params
    });
  /**
   *  Remove **all** of the records from a list. ***Note:*** *The list is not deleted.* This endpoint only works for lists that have a `processingType` of `MANUAL` or `SNAPSHOT`.
   *
   * @tags Lists API > Memberships
   * @name V3ListsMembershipsDelete
   * @summary Delete All Records from a List
   * @request DELETE:/crm/v3/lists/{listId}/memberships
   * @secure
   */
  v3ListsMembershipsDelete = async (listId: string, params: RequestParams = {}) =>
    this.request<string, string>({
      path: `/crm/v3/lists/${listId}/memberships`,
      method: 'DELETE',
      secure: true,
      ...params
    });
  /**
   *  Remove the records provided from the list. Records that do not exist or that are not members of the list are ignored. This endpoint only works for lists that have a `processingType` of `MANUAL` or `SNAPSHOT`.
   *
   * @tags Lists API > Memberships
   * @name V3ListsMembershipsRemoveUpdate
   * @summary Remove Records from a List
   * @request PUT:/crm/v3/lists/{listId}/memberships/remove
   * @secure
   */
  v3ListsMembershipsRemoveUpdate = async (
    listId: string,
    data: object,
    params: RequestParams = {}
  ) =>
    this.request<object, string>({
      path: `/crm/v3/lists/${listId}/memberships/remove`,
      method: 'PUT',
      body: data,
      secure: true,
      type: ContentType.Json,
      format: 'json',
      ...params
    });
  /**
   *  Search lists by list name or page through all lists by providing an empty `query` value.
   *
   * @tags Lists API > Lists
   * @name V3ListsSearchCreate
   * @summary Search Lists
   * @request POST:/crm/v3/lists/search
   * @secure
   */
  v3ListsSearchCreate = async (data: object, params: RequestParams = {}) =>
    this.request<object, string>({
      path: '/crm/v3/lists/search',
      method: 'POST',
      body: data,
      secure: true,
      type: ContentType.Json,
      format: 'json',
      ...params
    });
  /**
   *  Update the name of a list. The name must be globally unique relative to all other public lists in the portal.
   *
   * @tags Lists API
   * @name V3ListsUpdateListNameUpdate
   * @summary Update List Name
   * @request PUT:/crm/v3/lists/{listId}/update-list-name
   * @secure
   */
  v3ListsUpdateListNameUpdate = async (
    listId: string,
    data: any,
    query?: {
      /**
       * The name to update the list to.
       *
       * @example "<string>"
       */
      listName?: string;
      /**
       * A flag indicating whether or not the response object list definition should include a filter branch definition. By default, object list definitions will not have their filter branch definitions included in the response.
       *
       * @example "false"
       */
      includeFilters?: boolean;
    },
    params: RequestParams = {}
  ) =>
    this.request<string, string>({
      path: `/crm/v3/lists/${listId}/update-list-name`,
      method: 'PUT',
      query,
      body: data,
      secure: true,
      ...params
    });
  /**
   *  Fetch a single list by **ILS list ID**.
   *
   * @tags Lists API
   * @name V3ListsDetail
   * @summary Fetch List by ID
   * @request GET:/crm/v3/lists/{listId}
   * @secure
   */
  v3ListsDetail = async (
    listId: string,
    query?: {
      /**
       * A flag indicating whether or not the response object list definition should include a filter branch definition. By default, object list definitions will not have their filter branch definitions included in the response.
       *
       * @example "false"
       */
      includeFilters?: boolean;
    },
    params: RequestParams = {}
  ) =>
    this.request<string, string>({
      path: `/crm/v3/lists/${listId}`,
      method: 'GET',
      query,
      secure: true,
      ...params
    });
  /**
   *  Delete a list by **ILS list ID**. Lists deleted through this endpoint can be restored up to 90-days following the delete. After 90-days, the list is purged and can no longer be restored.
   *
   * @tags Lists API
   * @name V3ListsDelete
   * @summary Delete a List
   * @request DELETE:/crm/v3/lists/{listId}
   * @secure
   */
  v3ListsDelete = async (listId: string, params: RequestParams = {}) =>
    this.request<string, string>({
      path: `/crm/v3/lists/${listId}`,
      method: 'DELETE',
      secure: true,
      ...params
    });
  /**
   *  Update the filter branch definition of a `DYNAMIC` list. Once updated, the list memberships will be re-evaluated and updated to match the new definition.
   *
   * @tags Lists API
   * @name V3ListsUpdateListFiltersUpdate
   * @summary Update List Filter Definition
   * @request PUT:/crm/v3/lists/{listId}/update-list-filters
   * @secure
   */
  v3ListsUpdateListFiltersUpdate = async (
    listId: string,
    data: object,
    query?: {
      /**
       * A flag indicating whether or not the memberships added to the list as a result of the filter change should be enrolled in workflows that are relevant to this list.
       *
       * @example "false"
       */
      enrollObjectsInWorkflows?: boolean;
    },
    params: RequestParams = {}
  ) =>
    this.request<string, string>({
      path: `/crm/v3/lists/${listId}/update-list-filters`,
      method: 'PUT',
      query,
      body: data,
      secure: true,
      type: ContentType.Json,
      ...params
    });
  /**
   *  Fetch a single list by list name and object type.
   *
   * @tags Lists API
   * @name V3ListsObjectTypeIdNameDetail
   * @summary Fetch List by Name
   * @request GET:/crm/v3/lists/object-type-id/{objectTypeId}/name/{listName}
   * @secure
   */
  v3ListsObjectTypeIdNameDetail = async (
    objectTypeId: string,
    listName: string,
    query?: {
      /**
       * A flag indicating whether or not the response object list definition should include a filter branch definition. By default, object list definitions will not have their filter branch definitions included in the response.
       *
       * @example "false"
       */
      includeFilters?: boolean;
    },
    params: RequestParams = {}
  ) =>
    this.request<string, string>({
      path: `/crm/v3/lists/object-type-id/${objectTypeId}/name/${listName}`,
      method: 'GET',
      query,
      secure: true,
      ...params
    });
  /**
   *  Fetch multiple lists in a single request by **ILS list ID**. The response will include the definitions of all lists that exist for the `listIds` provided.
   *
   * @tags Lists API
   * @name V3ListsList
   * @summary Fetch Multiple Lists
   * @request GET:/crm/v3/lists/
   * @secure
   */
  v3ListsList = async (
    query?: {
      /**
       * The **ILS IDs** of the lists to fetch.
       *
       * @example "<integer>"
       */
      listIds?: string;
      /**
       * A flag indicating whether or not the response object list definitions should include a filter branch definition. By default, object list definitions will not have their filter branch definitions included in the response.
       *
       * @example "false"
       */
      includeFilters?: boolean;
    },
    params: RequestParams = {}
  ) =>
    this.request<string, string>({
      path: '/crm/v3/lists/',
      method: 'GET',
      query,
      secure: true,
      ...params
    });
  /**
   *  Create a new list with the provided object list definition.
   *
   * @tags Lists API
   * @name V3ListsCreate
   * @summary Create List
   * @request POST:/crm/v3/lists/
   * @secure
   */
  v3ListsCreate = async (data: object, params: RequestParams = {}) =>
    this.request<string, string>({
      path: '/crm/v3/lists/',
      method: 'POST',
      body: data,
      secure: true,
      type: ContentType.Json,
      ...params
    });
  /**
   *  Restore a previously deleted list by **ILS list ID**. Deleted lists are eligible to be restored up-to 90-days after the list has been deleted.
   *
   * @tags Lists API
   * @name V3ListsRestoreUpdate
   * @summary Restore a List
   * @request PUT:/crm/v3/lists/{listId}/restore
   * @secure
   */
  v3ListsRestoreUpdate = async (listId: string, data: any, params: RequestParams = {}) =>
    this.request<string, string>({
      path: `/crm/v3/lists/${listId}/restore`,
      method: 'PUT',
      body: data,
      secure: true,
      ...params
    });
  /**
   *  Given a list and a folder, the list will be moved to that folder.
   *
   * @tags Lists API
   * @name V3ListsFoldersMoveListUpdate
   * @summary Moves a list to a given folder
   * @request PUT:/crm/v3/lists/folders/move-list
   * @secure
   */
  v3ListsFoldersMoveListUpdate = async (data: object, params: RequestParams = {}) =>
    this.request<string, string>({
      path: '/crm/v3/lists/folders/move-list',
      method: 'PUT',
      body: data,
      secure: true,
      type: ContentType.Json,
      ...params
    });
  /**
   *  This moves the folder from its current location to a new location. It updates the parent of this folder to the new Id given.
   *
   * @tags Lists API
   * @name V3ListsFoldersMoveUpdate
   * @summary Moves a folder
   * @request PUT:/crm/v3/lists/folders/{folderId}/move/{newParentFolderId}
   * @secure
   */
  v3ListsFoldersMoveUpdate = async (
    folderId: string,
    newParentFolderId: string,
    data: any,
    params: RequestParams = {}
  ) =>
    this.request<object, string>({
      path: `/crm/v3/lists/folders/${folderId}/move/${newParentFolderId}`,
      method: 'PUT',
      body: data,
      secure: true,
      format: 'json',
      ...params
    });
  /**
   *  Renames the given folderId with a new name.
   *
   * @tags Lists API
   * @name V3ListsFoldersRenameUpdate
   * @summary Rename a folder
   * @request PUT:/crm/v3/lists/folders/{folderId}/rename
   * @secure
   */
  v3ListsFoldersRenameUpdate = async (
    folderId: string,
    data: any,
    query?: {
      /** @example "<string>" */
      newFolderName?: string;
    },
    params: RequestParams = {}
  ) =>
    this.request<object, string>({
      path: `/crm/v3/lists/folders/${folderId}/rename`,
      method: 'PUT',
      query,
      body: data,
      secure: true,
      format: 'json',
      ...params
    });
  /**
   *  For given record provide lists this record is member of.
   *
   * @tags Lists API
   * @name V3ListsRecordsMembershipsDetail
   * @summary Get lists record is member of
   * @request GET:/crm/v3/lists/records/{objectTypeId}/{recordId}/memberships
   * @secure
   */
  v3ListsRecordsMembershipsDetail = async (
    objectTypeId: string,
    recordId: string,
    params: RequestParams = {}
  ) =>
    this.request<object, string>({
      path: `/crm/v3/lists/records/${objectTypeId}/${recordId}/memberships`,
      method: 'GET',
      secure: true,
      format: 'json',
      ...params
    });
  /**
   *  Retrieves a folder and recursively includes all folders via the childNodes attribute.  The child lists field will be empty in all child nodes. Only the folder retrieved will include the child lists in that folder.
   *
   * @tags Lists API
   * @name V3ListsFoldersList
   * @summary Retrieves a folder.
   * @request GET:/crm/v3/lists/folders
   * @secure
   */
  v3ListsFoldersList = async (
    query?: {
      /**
       * The Id of the folder to retrieve.
       *
       * @example "0"
       */
      folderId?: number;
    },
    params: RequestParams = {}
  ) =>
    this.request<object, string>({
      path: '/crm/v3/lists/folders',
      method: 'GET',
      query,
      secure: true,
      format: 'json',
      ...params
    });
  /**
   *  Creates a folder with the given information.
   *
   * @tags Lists API
   * @name V3ListsFoldersCreate
   * @summary Creates a folder
   * @request POST:/crm/v3/lists/folders
   * @secure
   */
  v3ListsFoldersCreate = async (data: object, params: RequestParams = {}) =>
    this.request<object, string>({
      path: '/crm/v3/lists/folders',
      method: 'POST',
      body: data,
      secure: true,
      type: ContentType.Json,
      format: 'json',
      ...params
    });
  /**
   *  Deletes the folder with the given Id.
   *
   * @tags Lists API
   * @name V3ListsFoldersDelete
   * @summary Deletes a folder
   * @request DELETE:/crm/v3/lists/folders/{folderId}
   * @secure
   */
  v3ListsFoldersDelete = async (folderId: string, params: RequestParams = {}) =>
    this.request<string, string>({
      path: `/crm/v3/lists/folders/${folderId}`,
      method: 'DELETE',
      secure: true,
      ...params
    });
  /**
   * No description
   *
   * @tags Objects API > Public_Object
   * @name V3ObjectsMergeCreate
   * @summary Merge two objects with same type
   * @request POST:/crm/v3/objects/{objectType}/merge
   * @secure
   */
  v3ObjectsMergeCreate = async (objectType: string, data: object, params: RequestParams = {}) =>
    this.request<object, string>({
      path: `/crm/v3/objects/${objectType}/merge`,
      method: 'POST',
      body: data,
      secure: true,
      type: ContentType.Json,
      format: 'json',
      ...params
    });
  /**
   * No description
   *
   * @tags Orders API > Batch
   * @name V3ObjectsOrdersBatchReadCreate
   * @summary Read a batch of orders by internal ID, or unique property values
   * @request POST:/crm/v3/objects/orders/batch/read
   * @secure
   */
  v3ObjectsOrdersBatchReadCreate = async (
    data: object,
    query?: {
      /**
       * Whether to return only results that have been archived.
       *
       * @example "false"
       */
      archived?: boolean;
    },
    params: RequestParams = {}
  ) =>
    this.request<object, string>({
      path: '/crm/v3/objects/orders/batch/read',
      method: 'POST',
      query,
      body: data,
      secure: true,
      type: ContentType.Json,
      format: 'json',
      ...params
    });
  /**
   * No description
   *
   * @tags Orders API > Batch
   * @name V3ObjectsOrdersBatchArchiveCreate
   * @summary Archive a batch of orders by ID
   * @request POST:/crm/v3/objects/orders/batch/archive
   * @secure
   */
  v3ObjectsOrdersBatchArchiveCreate = async (data: object, params: RequestParams = {}) =>
    this.request<string, string>({
      path: '/crm/v3/objects/orders/batch/archive',
      method: 'POST',
      body: data,
      secure: true,
      type: ContentType.Json,
      ...params
    });
  /**
   * No description
   *
   * @tags Orders API > Batch
   * @name V3ObjectsOrdersBatchCreateCreate
   * @summary Create a batch of orders
   * @request POST:/crm/v3/objects/orders/batch/create
   * @secure
   */
  v3ObjectsOrdersBatchCreateCreate = async (data: object, params: RequestParams = {}) =>
    this.request<object, string>({
      path: '/crm/v3/objects/orders/batch/create',
      method: 'POST',
      body: data,
      secure: true,
      type: ContentType.Json,
      format: 'json',
      ...params
    });
  /**
   * No description
   *
   * @tags Orders API > Batch
   * @name V3ObjectsOrdersBatchUpdateCreate
   * @summary Update a batch of orders
   * @request POST:/crm/v3/objects/orders/batch/update
   * @secure
   */
  v3ObjectsOrdersBatchUpdateCreate = async (data: object, params: RequestParams = {}) =>
    this.request<object, string>({
      path: '/crm/v3/objects/orders/batch/update',
      method: 'POST',
      body: data,
      secure: true,
      type: ContentType.Json,
      format: 'json',
      ...params
    });
  /**
   *  Read an Object identified by `{orderId}`. `{orderId}` refers to the internal object ID by default, or optionally any unique property value as specified by the `idProperty` query param.  Control what is returned via the `properties` query param.
   *
   * @tags Orders API > Basic
   * @name V3ObjectsOrdersDetail
   * @summary Read
   * @request GET:/crm/v3/objects/orders/{orderId}
   * @secure
   */
  v3ObjectsOrdersDetail = async (
    orderId: string,
    query?: {
      /**
       * A comma separated list of the properties to be returned in the response. If any of the specified properties are not present on the requested object(s), they will be ignored.
       *
       * @example "<string>"
       */
      properties?: string;
      /**
       * A comma separated list of the properties to be returned along with their history of previous values. If any of the specified properties are not present on the requested object(s), they will be ignored.
       *
       * @example "<string>"
       */
      propertiesWithHistory?: string;
      /**
       * A comma separated list of object types to retrieve associated IDs for. If any of the specified associations do not exist, they will be ignored.
       *
       * @example "<string>"
       */
      associations?: string;
      /**
       * Whether to return only results that have been archived.
       *
       * @example "false"
       */
      archived?: boolean;
      /**
       * The name of a property whose values are unique for this object type
       *
       * @example "<string>"
       */
      idProperty?: string;
    },
    params: RequestParams = {}
  ) =>
    this.request<object, string>({
      path: `/crm/v3/objects/orders/${orderId}`,
      method: 'GET',
      query,
      secure: true,
      format: 'json',
      ...params
    });
  /**
   *  Move an Object identified by `{orderId}` to the recycling bin.
   *
   * @tags Orders API > Basic
   * @name V3ObjectsOrdersDelete
   * @summary Archive
   * @request DELETE:/crm/v3/objects/orders/{orderId}
   * @secure
   */
  v3ObjectsOrdersDelete = async (orderId: string, params: RequestParams = {}) =>
    this.request<string, string>({
      path: `/crm/v3/objects/orders/${orderId}`,
      method: 'DELETE',
      secure: true,
      ...params
    });
  /**
   *  Perform a partial update of an Object identified by `{orderId}`. `{orderId}` refers to the internal object ID by default, or optionally any unique property value as specified by the `idProperty` query param. Provided property values will be overwritten. Read-only and non-existent properties will be ignored. Properties values can be cleared by passing an empty string.
   *
   * @tags Orders API > Basic
   * @name V3ObjectsOrdersPartialUpdate
   * @summary Update
   * @request PATCH:/crm/v3/objects/orders/{orderId}
   * @secure
   */
  v3ObjectsOrdersPartialUpdate = async (
    orderId: string,
    data: object,
    query?: {
      /**
       * The name of a property whose values are unique for this object type
       *
       * @example "<string>"
       */
      idProperty?: string;
    },
    params: RequestParams = {}
  ) =>
    this.request<object, string>({
      path: `/crm/v3/objects/orders/${orderId}`,
      method: 'PATCH',
      query,
      body: data,
      secure: true,
      type: ContentType.Json,
      format: 'json',
      ...params
    });
  /**
   *  Read a page of orders. Control what is returned via the `properties` query param.
   *
   * @tags Orders API > Basic
   * @name V3ObjectsOrdersList
   * @summary List
   * @request GET:/crm/v3/objects/orders
   * @secure
   */
  v3ObjectsOrdersList = async (
    query?: {
      /**
       * The maximum number of results to display per page.
       *
       * @example "10"
       */
      limit?: number;
      /**
       * The paging cursor token of the last successfully read resource will be returned as the `paging.next.after` JSON property of a paged response containing more results.
       *
       * @example "<string>"
       */
      after?: string;
      /**
       * A comma separated list of the properties to be returned in the response. If any of the specified properties are not present on the requested object(s), they will be ignored.
       *
       * @example "<string>"
       */
      properties?: string;
      /**
       * A comma separated list of the properties to be returned along with their history of previous values. If any of the specified properties are not present on the requested object(s), they will be ignored. Usage of this parameter will reduce the maximum number of objects that can be read by a single request.
       *
       * @example "<string>"
       */
      propertiesWithHistory?: string;
      /**
       * A comma separated list of object types to retrieve associated IDs for. If any of the specified associations do not exist, they will be ignored.
       *
       * @example "<string>"
       */
      associations?: string;
      /**
       * Whether to return only results that have been archived.
       *
       * @example "false"
       */
      archived?: boolean;
    },
    params: RequestParams = {}
  ) =>
    this.request<object, string>({
      path: '/crm/v3/objects/orders',
      method: 'GET',
      query,
      secure: true,
      format: 'json',
      ...params
    });
  /**
   *  Create a order with the given properties and return a copy of the object, including the ID. Documentation and examples for creating standard orders is provided.
   *
   * @tags Orders API > Basic
   * @name V3ObjectsOrdersCreate
   * @summary Create
   * @request POST:/crm/v3/objects/orders
   * @secure
   */
  v3ObjectsOrdersCreate = async (data: object, params: RequestParams = {}) =>
    this.request<object, string>({
      path: '/crm/v3/objects/orders',
      method: 'POST',
      body: data,
      secure: true,
      type: ContentType.Json,
      format: 'json',
      ...params
    });
  /**
   * No description
   *
   * @tags Orders API > Search
   * @name V3ObjectsOrdersSearchCreate
   * @summary post-/crm/v3/objects/orders/search
   * @request POST:/crm/v3/objects/orders/search
   * @secure
   */
  v3ObjectsOrdersSearchCreate = async (data: object, params: RequestParams = {}) =>
    this.request<object, string>({
      path: '/crm/v3/objects/orders/search',
      method: 'POST',
      body: data,
      secure: true,
      type: ContentType.Json,
      format: 'json',
      ...params
    });
  /**
   * No description
   *
   * @tags Owners API > Owners
   * @name V3OwnersList
   * @summary Get a page of owners
   * @request GET:/crm/v3/owners/
   * @secure
   */
  v3OwnersList = async (
    query?: {
      /**
       * Filter by email address (optional)
       *
       * @example "<string>"
       */
      email?: string;
      /**
       * The paging cursor token of the last successfully read resource will be returned as the `paging.next.after` JSON property of a paged response containing more results.
       *
       * @example "<string>"
       */
      after?: string;
      /**
       * The maximum number of results to display per page.
       *
       * @example "100"
       */
      limit?: number;
      /**
       * Whether to return only results that have been archived.
       *
       * @example "false"
       */
      archived?: boolean;
    },
    params: RequestParams = {}
  ) =>
    this.request<object, string>({
      path: '/crm/v3/owners/',
      method: 'GET',
      query,
      secure: true,
      format: 'json',
      ...params
    });
  /**
   * No description
   *
   * @tags Owners API > Owners
   * @name V3OwnersDetail
   * @summary Read an owner by given `id` or `userId`
   * @request GET:/crm/v3/owners/{ownerId}
   * @secure
   */
  v3OwnersDetail = async (
    ownerId: string,
    query?: {
      /** @example "id" */
      idProperty?: string;
      /**
       * Whether to return only results that have been archived.
       *
       * @example "false"
       */
      archived?: boolean;
    },
    params: RequestParams = {}
  ) =>
    this.request<object, string>({
      path: `/crm/v3/owners/${ownerId}`,
      method: 'GET',
      query,
      secure: true,
      format: 'json',
      ...params
    });
  /**
   * No description
   *
   * @tags Payments API > Batch
   * @name V3ObjectsPaymentsBatchReadCreate
   * @summary Read a batch of payments by internal ID, or unique property values
   * @request POST:/crm/v3/objects/payments/batch/read
   */
  v3ObjectsPaymentsBatchReadCreate = async (
    data: object,
    query?: {
      /**
       * Whether to return only results that have been archived.
       *
       * @example "false"
       */
      archived?: boolean;
    },
    params: RequestParams = {}
  ) =>
    this.request<object, string>({
      path: '/crm/v3/objects/payments/batch/read',
      method: 'POST',
      query,
      body: data,
      type: ContentType.Json,
      format: 'json',
      ...params
    });
  /**
   *  Read an Object identified by `{paymentsId}`. `{paymentsId}` refers to the internal object ID by default, or optionally any unique property value as specified by the `idProperty` query param.  Control what is returned via the `properties` query param.
   *
   * @tags Payments API > Basic
   * @name V3ObjectsPaymentsDetail
   * @summary Read
   * @request GET:/crm/v3/objects/payments/{paymentsId}
   */
  v3ObjectsPaymentsDetail = async (
    paymentsId: string,
    query?: {
      /**
       * A comma separated list of the properties to be returned in the response. If any of the specified properties are not present on the requested object(s), they will be ignored.
       *
       * @example "<string>"
       */
      properties?: string;
      /**
       * A comma separated list of the properties to be returned along with their history of previous values. If any of the specified properties are not present on the requested object(s), they will be ignored.
       *
       * @example "<string>"
       */
      propertiesWithHistory?: string;
      /**
       * A comma separated list of object types to retrieve associated IDs for. If any of the specified associations do not exist, they will be ignored.
       *
       * @example "<string>"
       */
      associations?: string;
      /**
       * Whether to return only results that have been archived.
       *
       * @example "false"
       */
      archived?: boolean;
      /**
       * The name of a property whose values are unique for this object type
       *
       * @example "<string>"
       */
      idProperty?: string;
    },
    params: RequestParams = {}
  ) =>
    this.request<object, string>({
      path: `/crm/v3/objects/payments/${paymentsId}`,
      method: 'GET',
      query,
      format: 'json',
      ...params
    });
  /**
   *  Read a page of payments. Control what is returned via the `properties` query param.
   *
   * @tags Payments API > Basic
   * @name V3ObjectsPaymentsList
   * @summary List
   * @request GET:/crm/v3/objects/payments
   */
  v3ObjectsPaymentsList = async (
    query?: {
      /**
       * The maximum number of results to display per page.
       *
       * @example "10"
       */
      limit?: number;
      /**
       * The paging cursor token of the last successfully read resource will be returned as the `paging.next.after` JSON property of a paged response containing more results.
       *
       * @example "<string>"
       */
      after?: string;
      /**
       * A comma separated list of the properties to be returned in the response. If any of the specified properties are not present on the requested object(s), they will be ignored.
       *
       * @example "<string>"
       */
      properties?: string;
      /**
       * A comma separated list of the properties to be returned along with their history of previous values. If any of the specified properties are not present on the requested object(s), they will be ignored. Usage of this parameter will reduce the maximum number of objects that can be read by a single request.
       *
       * @example "<string>"
       */
      propertiesWithHistory?: string;
      /**
       * A comma separated list of object types to retrieve associated IDs for. If any of the specified associations do not exist, they will be ignored.
       *
       * @example "<string>"
       */
      associations?: string;
      /**
       * Whether to return only results that have been archived.
       *
       * @example "false"
       */
      archived?: boolean;
    },
    params: RequestParams = {}
  ) =>
    this.request<object, string>({
      path: '/crm/v3/objects/payments',
      method: 'GET',
      query,
      format: 'json',
      ...params
    });
  /**
   * No description
   *
   * @tags Payments API > Search
   * @name V3ObjectsPaymentsSearchCreate
   * @summary post-/crm/v3/objects/payments/search
   * @request POST:/crm/v3/objects/payments/search
   */
  v3ObjectsPaymentsSearchCreate = async (data: object, params: RequestParams = {}) =>
    this.request<object, string>({
      path: '/crm/v3/objects/payments/search',
      method: 'POST',
      body: data,
      type: ContentType.Json,
      format: 'json',
      ...params
    });
  /**
   *  Return a single pipeline object identified by its unique `{pipelineId}`.
   *
   * @tags Pipelines API > Pipelines
   * @name V3PipelinesDetail
   * @summary Return a pipeline by ID
   * @request GET:/crm/v3/pipelines/{objectType}/{pipelineId}
   * @secure
   */
  v3PipelinesDetail = async (objectType: string, pipelineId: string, params: RequestParams = {}) =>
    this.request<object, string>({
      path: `/crm/v3/pipelines/${objectType}/${pipelineId}`,
      method: 'GET',
      secure: true,
      format: 'json',
      ...params
    });
  /**
   *  Replace all the properties of an existing pipeline with the values provided. This will overwrite any existing pipeline stages. The updated pipeline will be returned in the response.
   *
   * @tags Pipelines API > Pipelines
   * @name V3PipelinesUpdate
   * @summary Replace a pipeline
   * @request PUT:/crm/v3/pipelines/{objectType}/{pipelineId}
   * @secure
   */
  v3PipelinesUpdate = async (
    objectType: string,
    pipelineId: string,
    data: object,
    query?: {
      /** @example "false" */
      validateReferencesBeforeDelete?: boolean;
      /** @example "false" */
      validateDealStageUsagesBeforeDelete?: boolean;
    },
    params: RequestParams = {}
  ) =>
    this.request<object, string>({
      path: `/crm/v3/pipelines/${objectType}/${pipelineId}`,
      method: 'PUT',
      query,
      body: data,
      secure: true,
      type: ContentType.Json,
      format: 'json',
      ...params
    });
  /**
   *  Delete the pipeline identified by `{pipelineId}`.
   *
   * @tags Pipelines API > Pipelines
   * @name V3PipelinesDelete
   * @summary Delete a pipeline
   * @request DELETE:/crm/v3/pipelines/{objectType}/{pipelineId}
   * @secure
   */
  v3PipelinesDelete = async (
    objectType: string,
    pipelineId: string,
    query?: {
      /** @example "false" */
      validateReferencesBeforeDelete?: boolean;
      /** @example "false" */
      validateDealStageUsagesBeforeDelete?: boolean;
    },
    params: RequestParams = {}
  ) =>
    this.request<string, string>({
      path: `/crm/v3/pipelines/${objectType}/${pipelineId}`,
      method: 'DELETE',
      query,
      secure: true,
      ...params
    });
  /**
   *  Perform a partial update of the pipeline identified by `{pipelineId}`. The updated pipeline will be returned in the response.
   *
   * @tags Pipelines API > Pipelines
   * @name V3PipelinesPartialUpdate
   * @summary Update a pipeline
   * @request PATCH:/crm/v3/pipelines/{objectType}/{pipelineId}
   * @secure
   */
  v3PipelinesPartialUpdate = async (
    objectType: string,
    pipelineId: string,
    data: object,
    query?: {
      /** @example "false" */
      validateReferencesBeforeDelete?: boolean;
      /** @example "false" */
      validateDealStageUsagesBeforeDelete?: boolean;
    },
    params: RequestParams = {}
  ) =>
    this.request<object, string>({
      path: `/crm/v3/pipelines/${objectType}/${pipelineId}`,
      method: 'PATCH',
      query,
      body: data,
      secure: true,
      type: ContentType.Json,
      format: 'json',
      ...params
    });
  /**
   *  Return all pipelines for the object type specified by `{objectType}`.
   *
   * @tags Pipelines API > Pipelines
   * @name V3PipelinesDetail2
   * @summary Retrieve all pipelines
   * @request GET:/crm/v3/pipelines/{objectType}
   * @originalName v3PipelinesDetail
   * @duplicate
   * @secure
   */
  v3PipelinesDetail2 = async (objectType: string, params: RequestParams = {}) =>
    this.request<object, string>({
      path: `/crm/v3/pipelines/${objectType}`,
      method: 'GET',
      secure: true,
      format: 'json',
      ...params
    });
  /**
   *  Create a new pipeline with the provided property values. The entire pipeline object, including its unique ID, will be returned in the response.
   *
   * @tags Pipelines API > Pipelines
   * @name V3PipelinesCreate
   * @summary Create a pipeline
   * @request POST:/crm/v3/pipelines/{objectType}
   * @secure
   */
  v3PipelinesCreate = async (objectType: string, data: object, params: RequestParams = {}) =>
    this.request<object, string>({
      path: `/crm/v3/pipelines/${objectType}`,
      method: 'POST',
      body: data,
      secure: true,
      type: ContentType.Json,
      format: 'json',
      ...params
    });
  /**
   *  Return a reverse chronological list of all mutations that have occurred on the pipeline identified by `{pipelineId}`.
   *
   * @tags Pipelines API > Pipeline Audits
   * @name V3PipelinesAuditDetail
   * @summary Return an audit of all changes to the pipeline
   * @request GET:/crm/v3/pipelines/{objectType}/{pipelineId}/audit
   * @secure
   */
  v3PipelinesAuditDetail = async (
    objectType: string,
    pipelineId: string,
    params: RequestParams = {}
  ) =>
    this.request<object, string>({
      path: `/crm/v3/pipelines/${objectType}/${pipelineId}/audit`,
      method: 'GET',
      secure: true,
      format: 'json',
      ...params
    });
  /**
   *  Return all the stages associated with the pipeline identified by `{pipelineId}`.
   *
   * @tags Pipelines API > Pipeline Stages
   * @name V3PipelinesStagesDetail
   * @summary Return all stages of a pipeline
   * @request GET:/crm/v3/pipelines/{objectType}/{pipelineId}/stages
   * @secure
   */
  v3PipelinesStagesDetail = async (
    objectType: string,
    pipelineId: string,
    params: RequestParams = {}
  ) =>
    this.request<object, string>({
      path: `/crm/v3/pipelines/${objectType}/${pipelineId}/stages`,
      method: 'GET',
      secure: true,
      format: 'json',
      ...params
    });
  /**
   *  Create a new stage associated with the pipeline identified by `{pipelineId}`. The entire stage object, including its unique ID, will be returned in the response.
   *
   * @tags Pipelines API > Pipeline Stages
   * @name V3PipelinesStagesCreate
   * @summary Create a pipeline stage
   * @request POST:/crm/v3/pipelines/{objectType}/{pipelineId}/stages
   * @secure
   */
  v3PipelinesStagesCreate = async (
    objectType: string,
    pipelineId: string,
    data: object,
    params: RequestParams = {}
  ) =>
    this.request<object, string>({
      path: `/crm/v3/pipelines/${objectType}/${pipelineId}/stages`,
      method: 'POST',
      body: data,
      secure: true,
      type: ContentType.Json,
      format: 'json',
      ...params
    });
  /**
   *  Return the stage identified by `{stageId}` associated with the pipeline identified by `{pipelineId}`.
   *
   * @tags Pipelines API > Pipeline Stages
   * @name V3PipelinesStagesDetail2
   * @summary Return a pipeline stage by ID
   * @request GET:/crm/v3/pipelines/{objectType}/{pipelineId}/stages/{stageId}
   * @originalName v3PipelinesStagesDetail
   * @duplicate
   * @secure
   */
  v3PipelinesStagesDetail2 = async (
    objectType: string,
    pipelineId: string,
    stageId: string,
    params: RequestParams = {}
  ) =>
    this.request<object, string>({
      path: `/crm/v3/pipelines/${objectType}/${pipelineId}/stages/${stageId}`,
      method: 'GET',
      secure: true,
      format: 'json',
      ...params
    });
  /**
   *  Replace all the properties of an existing pipeline stage with the values provided. The updated stage will be returned in the response.
   *
   * @tags Pipelines API > Pipeline Stages
   * @name V3PipelinesStagesUpdate
   * @summary Replace a pipeline stage
   * @request PUT:/crm/v3/pipelines/{objectType}/{pipelineId}/stages/{stageId}
   * @secure
   */
  v3PipelinesStagesUpdate = async (
    objectType: string,
    pipelineId: string,
    stageId: string,
    data: object,
    params: RequestParams = {}
  ) =>
    this.request<object, string>({
      path: `/crm/v3/pipelines/${objectType}/${pipelineId}/stages/${stageId}`,
      method: 'PUT',
      body: data,
      secure: true,
      type: ContentType.Json,
      format: 'json',
      ...params
    });
  /**
   *  Delete the pipeline stage identified by `{stageId}` associated with the pipeline identified by `{pipelineId}`.
   *
   * @tags Pipelines API > Pipeline Stages
   * @name V3PipelinesStagesDelete
   * @summary Delete a pipeline stage
   * @request DELETE:/crm/v3/pipelines/{objectType}/{pipelineId}/stages/{stageId}
   * @secure
   */
  v3PipelinesStagesDelete = async (
    objectType: string,
    pipelineId: string,
    stageId: string,
    params: RequestParams = {}
  ) =>
    this.request<string, string>({
      path: `/crm/v3/pipelines/${objectType}/${pipelineId}/stages/${stageId}`,
      method: 'DELETE',
      secure: true,
      ...params
    });
  /**
   *  Perform a partial update of the pipeline stage identified by `{stageId}` associated with the pipeline identified by `{pipelineId}`. Any properties not included in this update will keep their existing values. The updated stage will be returned in the response.
   *
   * @tags Pipelines API > Pipeline Stages
   * @name V3PipelinesStagesPartialUpdate
   * @summary Update a pipeline stage
   * @request PATCH:/crm/v3/pipelines/{objectType}/{pipelineId}/stages/{stageId}
   * @secure
   */
  v3PipelinesStagesPartialUpdate = async (
    objectType: string,
    pipelineId: string,
    stageId: string,
    data: object,
    params: RequestParams = {}
  ) =>
    this.request<object, string>({
      path: `/crm/v3/pipelines/${objectType}/${pipelineId}/stages/${stageId}`,
      method: 'PATCH',
      body: data,
      secure: true,
      type: ContentType.Json,
      format: 'json',
      ...params
    });
  /**
   *  Return a reverse chronological list of all mutations that have occurred on the pipeline stage identified by `{stageId}`.
   *
   * @tags Pipelines API
   * @name V3PipelinesStagesAuditDetail
   * @summary Return an audit of all changes to the pipeline stage
   * @request GET:/crm/v3/pipelines/{objectType}/{pipelineId}/stages/{stageId}/audit
   * @secure
   */
  v3PipelinesStagesAuditDetail = async (
    objectType: string,
    pipelineId: string,
    stageId: string,
    params: RequestParams = {}
  ) =>
    this.request<object, string>({
      path: `/crm/v3/pipelines/${objectType}/${pipelineId}/stages/${stageId}/audit`,
      method: 'GET',
      secure: true,
      format: 'json',
      ...params
    });
  /**
   * No description
   *
   * @tags Products API > Batch
   * @name V3ObjectsProductsBatchArchiveCreate
   * @summary Archive a batch of products by ID
   * @request POST:/crm/v3/objects/products/batch/archive
   */
  v3ObjectsProductsBatchArchiveCreate = async (data: object, params: RequestParams = {}) =>
    this.request<string, string>({
      path: '/crm/v3/objects/products/batch/archive',
      method: 'POST',
      body: data,
      type: ContentType.Json,
      ...params
    });
  /**
   * No description
   *
   * @tags Products API > Batch
   * @name V3ObjectsProductsBatchReadCreate
   * @summary Read a batch of products by internal ID, or unique property values
   * @request POST:/crm/v3/objects/products/batch/read
   */
  v3ObjectsProductsBatchReadCreate = async (
    data: object,
    query?: {
      /**
       * Whether to return only results that have been archived.
       *
       * @example "false"
       */
      archived?: boolean;
    },
    params: RequestParams = {}
  ) =>
    this.request<object, string>({
      path: '/crm/v3/objects/products/batch/read',
      method: 'POST',
      query,
      body: data,
      type: ContentType.Json,
      format: 'json',
      ...params
    });
  /**
   * No description
   *
   * @tags Products API > Batch
   * @name V3ObjectsProductsBatchCreateCreate
   * @summary Create a batch of products
   * @request POST:/crm/v3/objects/products/batch/create
   */
  v3ObjectsProductsBatchCreateCreate = async (data: object, params: RequestParams = {}) =>
    this.request<object, string>({
      path: '/crm/v3/objects/products/batch/create',
      method: 'POST',
      body: data,
      type: ContentType.Json,
      format: 'json',
      ...params
    });
  /**
   * No description
   *
   * @tags Products API > Batch
   * @name V3ObjectsProductsBatchUpdateCreate
   * @summary Update a batch of products by internal ID, or unique property values
   * @request POST:/crm/v3/objects/products/batch/update
   */
  v3ObjectsProductsBatchUpdateCreate = async (data: any, params: RequestParams = {}) =>
    this.request<object, string>({
      path: '/crm/v3/objects/products/batch/update',
      method: 'POST',
      body: data,
      format: 'json',
      ...params
    });
  /**
   *  Read a page of products. Control what is returned via the `properties` query param.
   *
   * @tags Products API > Basic
   * @name V3ObjectsProductsList
   * @summary List
   * @request GET:/crm/v3/objects/products
   */
  v3ObjectsProductsList = async (
    query?: {
      /**
       * The maximum number of results to display per page.
       *
       * @example "10"
       */
      limit?: number;
      /**
       * The paging cursor token of the last successfully read resource will be returned as the `paging.next.after` JSON property of a paged response containing more results.
       *
       * @example "<string>"
       */
      after?: string;
      /**
       * A comma separated list of the properties to be returned in the response. If any of the specified properties are not present on the requested object(s), they will be ignored.
       *
       * @example "<string>"
       */
      properties?: string;
      /**
       * A comma separated list of the properties to be returned along with their history of previous values. If any of the specified properties are not present on the requested object(s), they will be ignored. Usage of this parameter will reduce the maximum number of objects that can be read by a single request.
       *
       * @example "<string>"
       */
      propertiesWithHistory?: string;
      /**
       * A comma separated list of object types to retrieve associated IDs for. If any of the specified associations do not exist, they will be ignored.
       *
       * @example "<string>"
       */
      associations?: string;
      /**
       * Whether to return only results that have been archived.
       *
       * @example "false"
       */
      archived?: boolean;
    },
    params: RequestParams = {}
  ) =>
    this.request<object, string>({
      path: '/crm/v3/objects/products',
      method: 'GET',
      query,
      format: 'json',
      ...params
    });
  /**
   *  Create a product with the given properties and return a copy of the object, including the ID. Documentation and examples for creating standard products is provided.
   *
   * @tags Products API > Basic
   * @name V3ObjectsProductsCreate
   * @summary Create
   * @request POST:/crm/v3/objects/products
   */
  v3ObjectsProductsCreate = async (data: object, params: RequestParams = {}) =>
    this.request<object, string>({
      path: '/crm/v3/objects/products',
      method: 'POST',
      body: data,
      type: ContentType.Json,
      format: 'json',
      ...params
    });
  /**
   *  Read an Object identified by `{productId}`. `{productId}` refers to the internal object ID by default, or optionally any unique property value as specified by the `idProperty` query param.  Control what is returned via the `properties` query param.
   *
   * @tags Products API > Basic
   * @name V3ObjectsProductsDetail
   * @summary Read
   * @request GET:/crm/v3/objects/products/{productId}
   */
  v3ObjectsProductsDetail = async (
    productId: string,
    query?: {
      /**
       * A comma separated list of the properties to be returned in the response. If any of the specified properties are not present on the requested object(s), they will be ignored.
       *
       * @example "<string>"
       */
      properties?: string;
      /**
       * A comma separated list of the properties to be returned along with their history of previous values. If any of the specified properties are not present on the requested object(s), they will be ignored.
       *
       * @example "<string>"
       */
      propertiesWithHistory?: string;
      /**
       * A comma separated list of object types to retrieve associated IDs for. If any of the specified associations do not exist, they will be ignored.
       *
       * @example "<string>"
       */
      associations?: string;
      /**
       * Whether to return only results that have been archived.
       *
       * @example "false"
       */
      archived?: boolean;
      /**
       * The name of a property whose values are unique for this object type
       *
       * @example "<string>"
       */
      idProperty?: string;
    },
    params: RequestParams = {}
  ) =>
    this.request<object, string>({
      path: `/crm/v3/objects/products/${productId}`,
      method: 'GET',
      query,
      format: 'json',
      ...params
    });
  /**
   *  Move an Object identified by `{productId}` to the recycling bin.
   *
   * @tags Products API > Basic
   * @name V3ObjectsProductsDelete
   * @summary Archive
   * @request DELETE:/crm/v3/objects/products/{productId}
   */
  v3ObjectsProductsDelete = async (productId: string, params: RequestParams = {}) =>
    this.request<string, string>({
      path: `/crm/v3/objects/products/${productId}`,
      method: 'DELETE',
      ...params
    });
  /**
   *  Perform a partial update of an Object identified by `{productId}`. `{productId}` refers to the internal object ID by default, or optionally any unique property value as specified by the `idProperty` query param. Provided property values will be overwritten. Read-only and non-existent properties will be ignored. Properties values can be cleared by passing an empty string.
   *
   * @tags Products API > Basic
   * @name V3ObjectsProductsPartialUpdate
   * @summary Update
   * @request PATCH:/crm/v3/objects/products/{productId}
   */
  v3ObjectsProductsPartialUpdate = async (
    productId: string,
    data: object,
    query?: {
      /**
       * The name of a property whose values are unique for this object type
       *
       * @example "<string>"
       */
      idProperty?: string;
    },
    params: RequestParams = {}
  ) =>
    this.request<object, string>({
      path: `/crm/v3/objects/products/${productId}`,
      method: 'PATCH',
      query,
      body: data,
      type: ContentType.Json,
      format: 'json',
      ...params
    });
  /**
   * No description
   *
   * @tags Products API > Search
   * @name V3ObjectsProductsSearchCreate
   * @summary post-/crm/v3/objects/products/search do Search
   * @request POST:/crm/v3/objects/products/search
   */
  v3ObjectsProductsSearchCreate = async (data: any, params: RequestParams = {}) =>
    this.request<object, string>({
      path: '/crm/v3/objects/products/search',
      method: 'POST',
      body: data,
      format: 'json',
      ...params
    });
  /**
   * No description
   *
   * @tags Quotes API > Batch
   * @name V3ObjectsQuotesBatchArchiveCreate
   * @summary Archive a batch of quotes by ID
   * @request POST:/crm/v3/objects/quotes/batch/archive
   * @secure
   */
  v3ObjectsQuotesBatchArchiveCreate = async (data: object, params: RequestParams = {}) =>
    this.request<string, string>({
      path: '/crm/v3/objects/quotes/batch/archive',
      method: 'POST',
      body: data,
      secure: true,
      type: ContentType.Json,
      ...params
    });
  /**
   * No description
   *
   * @tags Quotes API > Batch
   * @name V3ObjectsQuotesBatchUpdateCreate
   * @summary Update a batch of quotes by internal ID, or unique property values
   * @request POST:/crm/v3/objects/quotes/batch/update
   * @secure
   */
  v3ObjectsQuotesBatchUpdateCreate = async (data: any, params: RequestParams = {}) =>
    this.request<object, string>({
      path: '/crm/v3/objects/quotes/batch/update',
      method: 'POST',
      body: data,
      secure: true,
      format: 'json',
      ...params
    });
  /**
   * No description
   *
   * @tags Quotes API > Batch
   * @name V3ObjectsQuotesBatchCreateCreate
   * @summary Create a batch of quotes
   * @request POST:/crm/v3/objects/quotes/batch/create
   * @secure
   */
  v3ObjectsQuotesBatchCreateCreate = async (data: object, params: RequestParams = {}) =>
    this.request<object, string>({
      path: '/crm/v3/objects/quotes/batch/create',
      method: 'POST',
      body: data,
      secure: true,
      type: ContentType.Json,
      format: 'json',
      ...params
    });
  /**
   * No description
   *
   * @tags Quotes API > Batch
   * @name V3ObjectsQuotesBatchReadCreate
   * @summary Read a batch of quotes by internal ID, or unique property values
   * @request POST:/crm/v3/objects/quotes/batch/read
   * @secure
   */
  v3ObjectsQuotesBatchReadCreate = async (
    data: object,
    query?: {
      /**
       * Whether to return only results that have been archived.
       *
       * @example "false"
       */
      archived?: boolean;
    },
    params: RequestParams = {}
  ) =>
    this.request<object, string>({
      path: '/crm/v3/objects/quotes/batch/read',
      method: 'POST',
      query,
      body: data,
      secure: true,
      type: ContentType.Json,
      format: 'json',
      ...params
    });
  /**
   *  Read a page of quotes. Control what is returned via the `properties` query param.
   *
   * @tags Quotes API > Basic
   * @name V3ObjectsQuotesList
   * @summary List
   * @request GET:/crm/v3/objects/quotes
   * @secure
   */
  v3ObjectsQuotesList = async (
    query?: {
      /**
       * The maximum number of results to display per page.
       *
       * @example "10"
       */
      limit?: number;
      /**
       * The paging cursor token of the last successfully read resource will be returned as the `paging.next.after` JSON property of a paged response containing more results.
       *
       * @example "<string>"
       */
      after?: string;
      /**
       * A comma separated list of the properties to be returned in the response. If any of the specified properties are not present on the requested object(s), they will be ignored.
       *
       * @example "<string>"
       */
      properties?: string;
      /**
       * A comma separated list of the properties to be returned along with their history of previous values. If any of the specified properties are not present on the requested object(s), they will be ignored. Usage of this parameter will reduce the maximum number of objects that can be read by a single request.
       *
       * @example "<string>"
       */
      propertiesWithHistory?: string;
      /**
       * A comma separated list of object types to retrieve associated IDs for. If any of the specified associations do not exist, they will be ignored.
       *
       * @example "<string>"
       */
      associations?: string;
      /**
       * Whether to return only results that have been archived.
       *
       * @example "false"
       */
      archived?: boolean;
    },
    params: RequestParams = {}
  ) =>
    this.request<object, string>({
      path: '/crm/v3/objects/quotes',
      method: 'GET',
      query,
      secure: true,
      format: 'json',
      ...params
    });
  /**
   *  Create a quote with the given properties and return a copy of the object, including the ID. Documentation and examples for creating standard quotes is provided.
   *
   * @tags Quotes API > Basic
   * @name V3ObjectsQuotesCreate
   * @summary Create
   * @request POST:/crm/v3/objects/quotes
   * @secure
   */
  v3ObjectsQuotesCreate = async (data: object, params: RequestParams = {}) =>
    this.request<object, string>({
      path: '/crm/v3/objects/quotes',
      method: 'POST',
      body: data,
      secure: true,
      type: ContentType.Json,
      format: 'json',
      ...params
    });
  /**
   *  Read an Object identified by `{quoteId}`. `{quoteId}` refers to the internal object ID by default, or optionally any unique property value as specified by the `idProperty` query param.  Control what is returned via the `properties` query param.
   *
   * @tags Quotes API > Basic
   * @name V3ObjectsQuotesDetail
   * @summary Read
   * @request GET:/crm/v3/objects/quotes/{quoteId}
   * @secure
   */
  v3ObjectsQuotesDetail = async (
    quoteId: string,
    query?: {
      /**
       * A comma separated list of the properties to be returned in the response. If any of the specified properties are not present on the requested object(s), they will be ignored.
       *
       * @example "<string>"
       */
      properties?: string;
      /**
       * A comma separated list of the properties to be returned along with their history of previous values. If any of the specified properties are not present on the requested object(s), they will be ignored.
       *
       * @example "<string>"
       */
      propertiesWithHistory?: string;
      /**
       * A comma separated list of object types to retrieve associated IDs for. If any of the specified associations do not exist, they will be ignored.
       *
       * @example "<string>"
       */
      associations?: string;
      /**
       * Whether to return only results that have been archived.
       *
       * @example "false"
       */
      archived?: boolean;
      /**
       * The name of a property whose values are unique for this object type
       *
       * @example "<string>"
       */
      idProperty?: string;
    },
    params: RequestParams = {}
  ) =>
    this.request<object, string>({
      path: `/crm/v3/objects/quotes/${quoteId}`,
      method: 'GET',
      query,
      secure: true,
      format: 'json',
      ...params
    });
  /**
   *  Move an Object identified by `{quoteId}` to the recycling bin.
   *
   * @tags Quotes API > Basic
   * @name V3ObjectsQuotesDelete
   * @summary Archive
   * @request DELETE:/crm/v3/objects/quotes/{quoteId}
   * @secure
   */
  v3ObjectsQuotesDelete = async (quoteId: string, params: RequestParams = {}) =>
    this.request<string, string>({
      path: `/crm/v3/objects/quotes/${quoteId}`,
      method: 'DELETE',
      secure: true,
      ...params
    });
  /**
   *  Perform a partial update of an Object identified by `{quoteId}`. `{quoteId}` refers to the internal object ID by default, or optionally any unique property value as specified by the `idProperty` query param. Provided property values will be overwritten. Read-only and non-existent properties will be ignored. Properties values can be cleared by passing an empty string.
   *
   * @tags Quotes API > Basic
   * @name V3ObjectsQuotesPartialUpdate
   * @summary Update
   * @request PATCH:/crm/v3/objects/quotes/{quoteId}
   * @secure
   */
  v3ObjectsQuotesPartialUpdate = async (
    quoteId: string,
    data: object,
    query?: {
      /**
       * The name of a property whose values are unique for this object type
       *
       * @example "<string>"
       */
      idProperty?: string;
    },
    params: RequestParams = {}
  ) =>
    this.request<object, string>({
      path: `/crm/v3/objects/quotes/${quoteId}`,
      method: 'PATCH',
      query,
      body: data,
      secure: true,
      type: ContentType.Json,
      format: 'json',
      ...params
    });
  /**
   * No description
   *
   * @tags Quotes API > Search
   * @name V3ObjectsQuotesSearchCreate
   * @summary post-/crm/v3/objects/quotes/search do Search
   * @request POST:/crm/v3/objects/quotes/search
   * @secure
   */
  v3ObjectsQuotesSearchCreate = async (data: any, params: RequestParams = {}) =>
    this.request<object, string>({
      path: '/crm/v3/objects/quotes/search',
      method: 'POST',
      body: data,
      secure: true,
      format: 'json',
      ...params
    });
  /**
   * No description
   *
   * @tags Taxes API > Batch
   * @name V3ObjectsTaxesBatchUpdateCreate
   * @summary Update a batch of taxes
   * @request POST:/crm/v3/objects/taxes/batch/update
   * @secure
   */
  v3ObjectsTaxesBatchUpdateCreate = async (data: object, params: RequestParams = {}) =>
    this.request<object, string>({
      path: '/crm/v3/objects/taxes/batch/update',
      method: 'POST',
      body: data,
      secure: true,
      type: ContentType.Json,
      format: 'json',
      ...params
    });
  /**
   * No description
   *
   * @tags Taxes API > Batch
   * @name V3ObjectsTaxesBatchCreateCreate
   * @summary Create a batch of taxes
   * @request POST:/crm/v3/objects/taxes/batch/create
   * @secure
   */
  v3ObjectsTaxesBatchCreateCreate = async (data: object, params: RequestParams = {}) =>
    this.request<object, string>({
      path: '/crm/v3/objects/taxes/batch/create',
      method: 'POST',
      body: data,
      secure: true,
      type: ContentType.Json,
      format: 'json',
      ...params
    });
  /**
   * No description
   *
   * @tags Taxes API > Batch
   * @name V3ObjectsTaxesBatchReadCreate
   * @summary Read a batch of taxes by internal ID, or unique property values
   * @request POST:/crm/v3/objects/taxes/batch/read
   * @secure
   */
  v3ObjectsTaxesBatchReadCreate = async (
    data: object,
    query?: {
      /**
       * Whether to return only results that have been archived.
       *
       * @example "false"
       */
      archived?: boolean;
    },
    params: RequestParams = {}
  ) =>
    this.request<object, string>({
      path: '/crm/v3/objects/taxes/batch/read',
      method: 'POST',
      query,
      body: data,
      secure: true,
      type: ContentType.Json,
      format: 'json',
      ...params
    });
  /**
   * No description
   *
   * @tags Taxes API > Batch
   * @name V3ObjectsTaxesBatchArchiveCreate
   * @summary Archive a batch of taxes by ID
   * @request POST:/crm/v3/objects/taxes/batch/archive
   * @secure
   */
  v3ObjectsTaxesBatchArchiveCreate = async (data: object, params: RequestParams = {}) =>
    this.request<string, string>({
      path: '/crm/v3/objects/taxes/batch/archive',
      method: 'POST',
      body: data,
      secure: true,
      type: ContentType.Json,
      ...params
    });
  /**
   *  Read a page of taxes. Control what is returned via the `properties` query param.
   *
   * @tags Taxes API > Basic
   * @name V3ObjectsTaxesList
   * @summary List
   * @request GET:/crm/v3/objects/taxes
   * @secure
   */
  v3ObjectsTaxesList = async (
    query?: {
      /**
       * The maximum number of results to display per page.
       *
       * @example "10"
       */
      limit?: number;
      /**
       * The paging cursor token of the last successfully read resource will be returned as the `paging.next.after` JSON property of a paged response containing more results.
       *
       * @example "<string>"
       */
      after?: string;
      /**
       * A comma separated list of the properties to be returned in the response. If any of the specified properties are not present on the requested object(s), they will be ignored.
       *
       * @example "<string>"
       */
      properties?: string;
      /**
       * A comma separated list of the properties to be returned along with their history of previous values. If any of the specified properties are not present on the requested object(s), they will be ignored. Usage of this parameter will reduce the maximum number of objects that can be read by a single request.
       *
       * @example "<string>"
       */
      propertiesWithHistory?: string;
      /**
       * A comma separated list of object types to retrieve associated IDs for. If any of the specified associations do not exist, they will be ignored.
       *
       * @example "<string>"
       */
      associations?: string;
      /**
       * Whether to return only results that have been archived.
       *
       * @example "false"
       */
      archived?: boolean;
    },
    params: RequestParams = {}
  ) =>
    this.request<object, string>({
      path: '/crm/v3/objects/taxes',
      method: 'GET',
      query,
      secure: true,
      format: 'json',
      ...params
    });
  /**
   *  Create a tax with the given properties and return a copy of the object, including the ID. Documentation and examples for creating standard taxes is provided.
   *
   * @tags Taxes API > Basic
   * @name V3ObjectsTaxesCreate
   * @summary Create
   * @request POST:/crm/v3/objects/taxes
   * @secure
   */
  v3ObjectsTaxesCreate = async (data: object, params: RequestParams = {}) =>
    this.request<object, string>({
      path: '/crm/v3/objects/taxes',
      method: 'POST',
      body: data,
      secure: true,
      type: ContentType.Json,
      format: 'json',
      ...params
    });
  /**
   *  Read an Object identified by `{taxId}`. `{taxId}` refers to the internal object ID by default, or optionally any unique property value as specified by the `idProperty` query param.  Control what is returned via the `properties` query param.
   *
   * @tags Taxes API > Basic
   * @name V3ObjectsTaxesDetail
   * @summary Read
   * @request GET:/crm/v3/objects/taxes/{taxId}
   * @secure
   */
  v3ObjectsTaxesDetail = async (
    taxId: string,
    query?: {
      /**
       * A comma separated list of the properties to be returned in the response. If any of the specified properties are not present on the requested object(s), they will be ignored.
       *
       * @example "<string>"
       */
      properties?: string;
      /**
       * A comma separated list of the properties to be returned along with their history of previous values. If any of the specified properties are not present on the requested object(s), they will be ignored.
       *
       * @example "<string>"
       */
      propertiesWithHistory?: string;
      /**
       * A comma separated list of object types to retrieve associated IDs for. If any of the specified associations do not exist, they will be ignored.
       *
       * @example "<string>"
       */
      associations?: string;
      /**
       * Whether to return only results that have been archived.
       *
       * @example "false"
       */
      archived?: boolean;
      /**
       * The name of a property whose values are unique for this object type
       *
       * @example "<string>"
       */
      idProperty?: string;
    },
    params: RequestParams = {}
  ) =>
    this.request<object, string>({
      path: `/crm/v3/objects/taxes/${taxId}`,
      method: 'GET',
      query,
      secure: true,
      format: 'json',
      ...params
    });
  /**
   *  Move an Object identified by `{taxId}` to the recycling bin.
   *
   * @tags Taxes API > Basic
   * @name V3ObjectsTaxesDelete
   * @summary Archive
   * @request DELETE:/crm/v3/objects/taxes/{taxId}
   * @secure
   */
  v3ObjectsTaxesDelete = async (taxId: string, params: RequestParams = {}) =>
    this.request<string, string>({
      path: `/crm/v3/objects/taxes/${taxId}`,
      method: 'DELETE',
      secure: true,
      ...params
    });
  /**
   *  Perform a partial update of an Object identified by `{taxId}`. `{taxId}` refers to the internal object ID by default, or optionally any unique property value as specified by the `idProperty` query param. Provided property values will be overwritten. Read-only and non-existent properties will be ignored. Properties values can be cleared by passing an empty string.
   *
   * @tags Taxes API > Basic
   * @name V3ObjectsTaxesPartialUpdate
   * @summary Update
   * @request PATCH:/crm/v3/objects/taxes/{taxId}
   * @secure
   */
  v3ObjectsTaxesPartialUpdate = async (
    taxId: string,
    data: object,
    query?: {
      /**
       * The name of a property whose values are unique for this object type
       *
       * @example "<string>"
       */
      idProperty?: string;
    },
    params: RequestParams = {}
  ) =>
    this.request<object, string>({
      path: `/crm/v3/objects/taxes/${taxId}`,
      method: 'PATCH',
      query,
      body: data,
      secure: true,
      type: ContentType.Json,
      format: 'json',
      ...params
    });
  /**
   * No description
   *
   * @tags Taxes API > Public_Object
   * @name V3ObjectsTaxesMergeCreate
   * @summary Merge two taxes with same type
   * @request POST:/crm/v3/objects/taxes/merge
   * @secure
   */
  v3ObjectsTaxesMergeCreate = async (data: object, params: RequestParams = {}) =>
    this.request<object, string>({
      path: '/crm/v3/objects/taxes/merge',
      method: 'POST',
      body: data,
      secure: true,
      type: ContentType.Json,
      format: 'json',
      ...params
    });
  /**
   *  Permanently delete a contact and all associated content to follow GDPR. Use optional property 'idProperty' set to 'email' to identify contact by email address. If email address is not found, the email address will be added to a blocklist and prevent it from being used in the future.
   *
   * @tags Taxes API > GDPR
   * @name V3ObjectsTaxesGdprDeleteCreate
   * @summary GDPR DELETE
   * @request POST:/crm/v3/objects/taxes/gdpr-delete
   * @secure
   */
  v3ObjectsTaxesGdprDeleteCreate = async (data: object, params: RequestParams = {}) =>
    this.request<string, string>({
      path: '/crm/v3/objects/taxes/gdpr-delete',
      method: 'POST',
      body: data,
      secure: true,
      type: ContentType.Json,
      ...params
    });
  /**
   * No description
   *
   * @tags Taxes API > Search
   * @name V3ObjectsTaxesSearchCreate
   * @summary post-/crm/v3/objects/taxes/search
   * @request POST:/crm/v3/objects/taxes/search
   * @secure
   */
  v3ObjectsTaxesSearchCreate = async (data: object, params: RequestParams = {}) =>
    this.request<object, string>({
      path: '/crm/v3/objects/taxes/search',
      method: 'POST',
      body: data,
      secure: true,
      type: ContentType.Json,
      format: 'json',
      ...params
    });
  /**
   * No description
   *
   * @tags Tickets API > Batch
   * @name V3ObjectsTicketsBatchArchiveCreate
   * @summary Archive a batch of tickets by ID
   * @request POST:/crm/v3/objects/tickets/batch/archive
   */
  v3ObjectsTicketsBatchArchiveCreate = async (data: object, params: RequestParams = {}) =>
    this.request<string, string>({
      path: '/crm/v3/objects/tickets/batch/archive',
      method: 'POST',
      body: data,
      type: ContentType.Json,
      ...params
    });
  /**
   * No description
   *
   * @tags Tickets API > Batch
   * @name V3ObjectsTicketsBatchReadCreate
   * @summary Read a batch of tickets by internal ID, or unique property values
   * @request POST:/crm/v3/objects/tickets/batch/read
   */
  v3ObjectsTicketsBatchReadCreate = async (
    data: object,
    query?: {
      /**
       * Whether to return only results that have been archived.
       *
       * @example "false"
       */
      archived?: boolean;
    },
    params: RequestParams = {}
  ) =>
    this.request<object, string>({
      path: '/crm/v3/objects/tickets/batch/read',
      method: 'POST',
      query,
      body: data,
      type: ContentType.Json,
      format: 'json',
      ...params
    });
  /**
   * No description
   *
   * @tags Tickets API > Batch
   * @name V3ObjectsTicketsBatchCreateCreate
   * @summary Create a batch of tickets
   * @request POST:/crm/v3/objects/tickets/batch/create
   */
  v3ObjectsTicketsBatchCreateCreate = async (data: object, params: RequestParams = {}) =>
    this.request<object, string>({
      path: '/crm/v3/objects/tickets/batch/create',
      method: 'POST',
      body: data,
      type: ContentType.Json,
      format: 'json',
      ...params
    });
  /**
   * No description
   *
   * @tags Tickets API > Batch
   * @name V3ObjectsTicketsBatchUpdateCreate
   * @summary Update a batch of tickets by internal ID, or unique property values
   * @request POST:/crm/v3/objects/tickets/batch/update
   */
  v3ObjectsTicketsBatchUpdateCreate = async (data: any, params: RequestParams = {}) =>
    this.request<object, string>({
      path: '/crm/v3/objects/tickets/batch/update',
      method: 'POST',
      body: data,
      format: 'json',
      ...params
    });
  /**
   *  Read an Object identified by `{ticketId}`. `{ticketId}` refers to the internal object ID by default, or optionally any unique property value as specified by the `idProperty` query param.  Control what is returned via the `properties` query param.
   *
   * @tags Tickets API > Basic
   * @name V3ObjectsTicketsDetail
   * @summary Read
   * @request GET:/crm/v3/objects/tickets/{ticketId}
   */
  v3ObjectsTicketsDetail = async (
    ticketId: string,
    query?: {
      /**
       * A comma separated list of the properties to be returned in the response. If any of the specified properties are not present on the requested object(s), they will be ignored.
       *
       * @example "<string>"
       */
      properties?: string;
      /**
       * A comma separated list of the properties to be returned along with their history of previous values. If any of the specified properties are not present on the requested object(s), they will be ignored.
       *
       * @example "<string>"
       */
      propertiesWithHistory?: string;
      /**
       * A comma separated list of object types to retrieve associated IDs for. If any of the specified associations do not exist, they will be ignored.
       *
       * @example "<string>"
       */
      associations?: string;
      /**
       * Whether to return only results that have been archived.
       *
       * @example "false"
       */
      archived?: boolean;
      /**
       * The name of a property whose values are unique for this object type
       *
       * @example "<string>"
       */
      idProperty?: string;
    },
    params: RequestParams = {}
  ) =>
    this.request<object, string>({
      path: `/crm/v3/objects/tickets/${ticketId}`,
      method: 'GET',
      query,
      format: 'json',
      ...params
    });
  /**
   *  Move an Object identified by `{ticketId}` to the recycling bin.
   *
   * @tags Tickets API > Basic
   * @name V3ObjectsTicketsDelete
   * @summary Archive
   * @request DELETE:/crm/v3/objects/tickets/{ticketId}
   */
  v3ObjectsTicketsDelete = async (ticketId: string, params: RequestParams = {}) =>
    this.request<string, string>({
      path: `/crm/v3/objects/tickets/${ticketId}`,
      method: 'DELETE',
      ...params
    });
  /**
   *  Perform a partial update of an Object identified by `{ticketId}`. `{ticketId}` refers to the internal object ID by default, or optionally any unique property value as specified by the `idProperty` query param. Provided property values will be overwritten. Read-only and non-existent properties will be ignored. Properties values can be cleared by passing an empty string.
   *
   * @tags Tickets API > Basic
   * @name V3ObjectsTicketsPartialUpdate
   * @summary Update
   * @request PATCH:/crm/v3/objects/tickets/{ticketId}
   */
  v3ObjectsTicketsPartialUpdate = async (
    ticketId: string,
    data: object,
    query?: {
      /**
       * The name of a property whose values are unique for this object type
       *
       * @example "<string>"
       */
      idProperty?: string;
    },
    params: RequestParams = {}
  ) =>
    this.request<object, string>({
      path: `/crm/v3/objects/tickets/${ticketId}`,
      method: 'PATCH',
      query,
      body: data,
      type: ContentType.Json,
      format: 'json',
      ...params
    });
  /**
   *  Read a page of tickets. Control what is returned via the `properties` query param.
   *
   * @tags Tickets API > Basic
   * @name V3ObjectsTicketsList
   * @summary List
   * @request GET:/crm/v3/objects/tickets
   */
  v3ObjectsTicketsList = async (
    query?: {
      /**
       * The maximum number of results to display per page.
       *
       * @example "10"
       */
      limit?: number;
      /**
       * The paging cursor token of the last successfully read resource will be returned as the `paging.next.after` JSON property of a paged response containing more results.
       *
       * @example "<string>"
       */
      after?: string;
      /**
       * A comma separated list of the properties to be returned in the response. If any of the specified properties are not present on the requested object(s), they will be ignored.
       *
       * @example "<string>"
       */
      properties?: string;
      /**
       * A comma separated list of the properties to be returned along with their history of previous values. If any of the specified properties are not present on the requested object(s), they will be ignored. Usage of this parameter will reduce the maximum number of objects that can be read by a single request.
       *
       * @example "<string>"
       */
      propertiesWithHistory?: string;
      /**
       * A comma separated list of object types to retrieve associated IDs for. If any of the specified associations do not exist, they will be ignored.
       *
       * @example "<string>"
       */
      associations?: string;
      /**
       * Whether to return only results that have been archived.
       *
       * @example "false"
       */
      archived?: boolean;
    },
    params: RequestParams = {}
  ) =>
    this.request<object, string>({
      path: '/crm/v3/objects/tickets',
      method: 'GET',
      query,
      format: 'json',
      ...params
    });
  /**
   *  Create a ticket with the given properties and return a copy of the object, including the ID. Documentation and examples for creating standard tickets is provided.
   *
   * @tags Tickets API > Basic
   * @name V3ObjectsTicketsCreate
   * @summary Create
   * @request POST:/crm/v3/objects/tickets
   */
  v3ObjectsTicketsCreate = async (data: object, params: RequestParams = {}) =>
    this.request<object, string>({
      path: '/crm/v3/objects/tickets',
      method: 'POST',
      body: data,
      type: ContentType.Json,
      format: 'json',
      ...params
    });
  /**
   * No description
   *
   * @tags Tickets API > Search
   * @name V3ObjectsTicketsSearchCreate
   * @summary post-/crm/v3/objects/tickets/search do Search
   * @request POST:/crm/v3/objects/tickets/search
   */
  v3ObjectsTicketsSearchCreate = async (data: any, params: RequestParams = {}) =>
    this.request<object, string>({
      path: '/crm/v3/objects/tickets/search',
      method: 'POST',
      body: data,
      format: 'json',
      ...params
    });
  /**
   * No description
   *
   * @tags Invoices API > Batch
   * @name V3ObjectsInvoicesBatchReadCreate
   * @summary Read a batch of invoices by internal ID, or unique property values
   * @request POST:/crm/v3/objects/invoices/batch/read
   * @secure
   */
  v3ObjectsInvoicesBatchReadCreate = async (
    data: object,
    query?: {
      /**
       * Whether to return only results that have been archived.
       *
       * @example "false"
       */
      archived?: boolean;
    },
    params: RequestParams = {}
  ) =>
    this.request<object, string>({
      path: '/crm/v3/objects/invoices/batch/read',
      method: 'POST',
      query,
      body: data,
      secure: true,
      type: ContentType.Json,
      format: 'json',
      ...params
    });
  /**
   *  Read an Object identified by `{invoiceId}`. `{invoiceId}` refers to the internal object ID by default, or optionally any unique property value as specified by the `idProperty` query param.  Control what is returned via the `properties` query param.
   *
   * @tags Invoices API > Basic
   * @name V3ObjectsInvoicesDetail
   * @summary Read
   * @request GET:/crm/v3/objects/invoices/{invoiceId}
   * @secure
   */
  v3ObjectsInvoicesDetail = async (
    invoiceId: string,
    query?: {
      /**
       * A comma separated list of the properties to be returned in the response. If any of the specified properties are not present on the requested object(s), they will be ignored.
       *
       * @example "<string>"
       */
      properties?: string;
      /**
       * A comma separated list of the properties to be returned along with their history of previous values. If any of the specified properties are not present on the requested object(s), they will be ignored.
       *
       * @example "<string>"
       */
      propertiesWithHistory?: string;
      /**
       * A comma separated list of object types to retrieve associated IDs for. If any of the specified associations do not exist, they will be ignored.
       *
       * @example "<string>"
       */
      associations?: string;
      /**
       * Whether to return only results that have been archived.
       *
       * @example "false"
       */
      archived?: boolean;
      /**
       * The name of a property whose values are unique for this object type
       *
       * @example "<string>"
       */
      idProperty?: string;
    },
    params: RequestParams = {}
  ) =>
    this.request<object, string>({
      path: `/crm/v3/objects/invoices/${invoiceId}`,
      method: 'GET',
      query,
      secure: true,
      format: 'json',
      ...params
    });
  /**
   *  Read a page of invoices. Control what is returned via the `properties` query param.
   *
   * @tags Invoices API > Basic
   * @name V3ObjectsInvoicesList
   * @summary List
   * @request GET:/crm/v3/objects/invoices
   * @secure
   */
  v3ObjectsInvoicesList = async (
    query?: {
      /**
       * The maximum number of results to display per page.
       *
       * @example "10"
       */
      limit?: number;
      /**
       * The paging cursor token of the last successfully read resource will be returned as the `paging.next.after` JSON property of a paged response containing more results.
       *
       * @example "<string>"
       */
      after?: string;
      /**
       * A comma separated list of the properties to be returned in the response. If any of the specified properties are not present on the requested object(s), they will be ignored.
       *
       * @example "<string>"
       */
      properties?: string;
      /**
       * A comma separated list of the properties to be returned along with their history of previous values. If any of the specified properties are not present on the requested object(s), they will be ignored. Usage of this parameter will reduce the maximum number of objects that can be read by a single request.
       *
       * @example "<string>"
       */
      propertiesWithHistory?: string;
      /**
       * A comma separated list of object types to retrieve associated IDs for. If any of the specified associations do not exist, they will be ignored.
       *
       * @example "<string>"
       */
      associations?: string;
      /**
       * Whether to return only results that have been archived.
       *
       * @example "false"
       */
      archived?: boolean;
    },
    params: RequestParams = {}
  ) =>
    this.request<object, string>({
      path: '/crm/v3/objects/invoices',
      method: 'GET',
      query,
      secure: true,
      format: 'json',
      ...params
    });
  /**
   * No description
   *
   * @tags Invoices API > Search
   * @name V3ObjectsInvoicesSearchCreate
   * @summary post-/crm/v3/objects/invoices/search
   * @request POST:/crm/v3/objects/invoices/search
   * @secure
   */
  v3ObjectsInvoicesSearchCreate = async (data: object, params: RequestParams = {}) =>
    this.request<object, string>({
      path: '/crm/v3/objects/invoices/search',
      method: 'POST',
      body: data,
      secure: true,
      type: ContentType.Json,
      format: 'json',
      ...params
    });
}

/* eslint-enable max-lines */
