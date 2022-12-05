import { forwardRef, useImperativeHandle } from "react";

// Define the handle types which will be passed to the forwardRef
export type CountdownHandle = {
    start: () => void;
  };
  
  type CountdownProps = {};
  
  const Countdown = forwardRef<CountdownHandle, CountdownProps>((props, ref) => {
    useImperativeHandle(ref, () => ({
      // start() has type inference here
      start() {
        alert("Start");
      },
    }));
  
    return <div>Countdown</div>;
  });

  export default Countdown;