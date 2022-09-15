import React, { ClassType, Component, ComponentClass, ComponentPropsWithRef, ComponentType, ForwardedRef, ReactElement, Ref } from 'react';

// function hoc<K extends keyof JSX.IntrinsicElements>(
//   Component: K
// ): React.ForwardRefExoticComponent<JSX.IntrinsicElements[K]>

// function hoc<P, T extends React.ComponentClass<P>>(
//     Component: T,
// ): React.ForwardRefExoticComponent<P & { ref?: React.Ref<InstanceType<T>> }>;
// function hoc<T, P extends { ref?: React.Ref<T> }>(
//     Component: React.ForwardRefExoticComponent<P>,
// ): React.ForwardRefExoticComponent<P>;
// function hoc<P>(
//     Component: React.FunctionComponent<P>,
// ): React.ForwardRefExoticComponent<P>;







type ClassComponentType<T, P> = T extends React.Component<P> ? {new (props: P): T} : never;
type ExoticComponentType<T, P> = React.ExoticComponent<P & React.RefAttributes<T>>;

function logPropsHOC<T, P>(WrappedComponent: ClassComponentType<T, P> | React.FunctionComponent<P> | ExoticComponentType<T, P>) {
  class LogProps extends React.Component<P & {fRef: ForwardedRef<T>}, {}> {
    componentDidUpdate(prevProps: P) {
      console.log('old props:', prevProps);
      console.log('new props:', this.props);
    }
    render() {
      return <WrappedComponent ref={this.props.fRef} {...this.props} />;
    }
  }
   return React.forwardRef<T, P>((props, fRef) => <LogProps fRef={fRef} {...props} />);
}

// function logPropsHOC<P, T extends React.ComponentClass<P>>(WrappedComponent: T) {
//   class LogProps extends React.Component<P & {fRef: Ref<InstanceType<T>>}, {}> {
//     componentDidUpdate(prevProps: P) {
//       console.log('old props:', prevProps);
//       console.log('new props:', this.props);
//     }
//     render() {
//       return <WrappedComponent ref={this.props.fRef} {...this.props} />;
//     }
//   }

//   return React.forwardRef<InstanceType<T>, P>((props, fRef) => <LogProps {...props} fRef={fRef} />);
// }

export default logPropsHOC;