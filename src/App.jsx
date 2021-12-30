import useData from "./hooks/useData";

import MainControl from "./components/MainControl";
import Audio from "./components/Audio";
import SubControl from "./components/SubControl";

const App = () => {
  const props = useData();
  const { sessionLength, breakLength, setting } = props;
  return (
    <>
      <MainControl {...props} />
      <SubControl {...{ sessionLength, breakLength, setting }} />
      <Audio />
    </>
  );
};

export default App;
