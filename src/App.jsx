import useData from "./hooks/useData";

import MainControl from "./components/MainControl";
import Audio from "./components/Audio";
import SubControlList from "./components/SubControlList";

const App = () => {
  const props = useData();
  const { sessionLength, breakLength, setting } = props;
  return (
    <>
      <MainControl {...props} />
      <SubControlList {...{ sessionLength, breakLength, setting }} />
      <Audio />
    </>
  );
};

export default App;
