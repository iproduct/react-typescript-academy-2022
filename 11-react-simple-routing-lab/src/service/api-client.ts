import { Post } from './../model/post';
import { Identifiable, IdType } from "../shared/common-types";
const API_BASE_URL = `http://localhost:9000/api`;

export interface ApiClient<K, V extends Identifiable<K>> {
    findAll(): Promise<V[]>;
    findById(id: K): Promise<V>;
    create(entityWithoutId: Omit<V, 'id'>): Promise<V>;
    update(entity: V): Promise<V>;
    patchById(id: IdType, patch: Partial<V>): Promise<V>;
    deleteById(id: K): Promise<void>;
}

export class ApiClientImpl<K, V extends Identifiable<K>> implements ApiClient<K, V> {
    constructor(public apiCollectionSuffix: string) {}
    findAll(): Promise<V[]> {
        return this.handleJsonRequest<V[]>(`${API_BASE_URL}/${this.apiCollectionSuffix}`);
    }
    findById(id: K): Promise<V> {
        return this.handleJsonRequest<V>(`${API_BASE_URL}/${this.apiCollectionSuffix}/${id}`);
    }
    create(entityWithoutId: Omit<V, 'id'>): Promise<V> {
        return this.handleJsonRequest<V>(`${API_BASE_URL}/${this.apiCollectionSuffix}`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(entityWithoutId)
        });
    }
    update(entity: V): Promise<V> {
        return this.handleJsonRequest<V>(`${API_BASE_URL}/${this.apiCollectionSuffix}/${entity.id}`, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(entity)
        });
    }
    patchById(id: IdType, patch: Partial<V>): Promise<V> {
        return this.handleJsonRequest<V>(`${API_BASE_URL}/${this.apiCollectionSuffix}/${id}`, {
            method: 'PATCH',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(patch)
        });
    }
    async deleteById(id: K): Promise<void> {
        await this.handleJsonRequest<V>(`${API_BASE_URL}/${this.apiCollectionSuffix}/${id}`, {
            method: 'DELETE',
        });
    }

    protected async handleJsonRequest<V>(url: string, options?: RequestInit): Promise<V> {
        try {
            const postsResp = await fetch(url, options);
            if (postsResp.status >= 400) {
                return Promise.reject(postsResp.body);
            }
            return postsResp.json() as Promise<V>;
        } catch (err) {
            return Promise.reject(err);
        }
    }
}

export interface PostsApiClient extends ApiClient<IdType, Post>{
    findByTitleLike(title: string): Promise<Post[]>;
}

export class PostsApiClientImpl extends ApiClientImpl<IdType, Post> implements PostsApiClient {
    constructor() {
        super('posts')
    }
    findByTitleLike(search: string): Promise<Post[]> {
        return this.handleJsonRequest<Post[]>(`${API_BASE_URL}/${this.apiCollectionSuffix}?title_like=${encodeURIComponent(search)}`);
    }
}

