// Example from https://beta.reactjs.org/learn
import styles from './loading.module.css'

const LoadingComponent = ({loadingInfo, ...otherProps}) => {
  return (
    <div>
      <h3>kk content</h3>
      <p>{loadingInfo ? loadingInfo : 'loading'}</p>
    </div>
  );
};

export default LoadingComponent;

