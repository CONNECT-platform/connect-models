import { Injectable } from '@angular/core';

import { ModelSchema } from './types';

@Injectable({
  providedIn: 'root'
})
export class CentralService {
  public schemas: {[key: string]: any} = {};

  constructor() {
    this.schemas.user = <ModelSchema> {
      name: 'User',
      fields: [
        { name: 'id' },
        { name: 'name', type: 'text '},
        { name: 'email', type: 'email address'}
      ]
    };

    this.schemas.journal = <ModelSchema> {
      name: 'Journal',
      fields: [
        { name: 'id' },
        { name: 'name', type: 'text' },
        { name: 'editor', type: 'ref', reference: this.schemas.user }
      ]
    },

    this.schemas.subscription = <ModelSchema> {
      name: 'Subscription',
      fields: [
        { name: 'id' },
        { name: 'journal', type: 'ref', reference: this.schemas.journal },
        { name: 'user', type: 'ref', reference: this.schemas.user },
        { name: 'start', type: 'date' },
        { name: 'end', type: 'date' }
      ]
    };

    this.schemas.article = <ModelSchema> {
      name: 'Article',
      fields: [
        { name: 'id' },
        { name: 'content', type: 'text' },
        { name: 'author', type: 'ref', reference: this.schemas.user },
        { name: 'journal', type: 'ref', reference: this.schemas.journal },
        { name: 'published_at', type: 'date' }
      ]
    };
  }
}
