import { ReactNode } from 'react';
import { IndexRouteObject, NonIndexRouteObject } from 'react-router';

export type AuthIndexRouteObject<T extends Record<string, any> = any> =
  IndexRouteObject & {
    [P in keyof T]: T[P];
  };

export type AuthNonIndexRouteObject<T extends Record<string, any> = any> = Omit<
  NonIndexRouteObject,
  'children'
> & {
  [P in keyof T]: T[P];
} & {
  children?: AuthRouteObject<T>[];
};

export type AuthRouteObject<T extends Record<string, any> = any> =
  | AuthIndexRouteObject<T>
  | AuthNonIndexRouteObject<T>;

export type MetaMenu = {
  meta: {
    title?: string;
    icon?: ReactNode;
  };
};
