import { useState } from "react";

function addToMicrocomponentRender(_key, g_mCRenderList, _functionSet) {
  if (_key in g_mCRenderList) {
    g_mCRenderList[_key].add(_functionSet);
  } else {
    g_mCRenderList[_key] = new Set([_functionSet]);
  }
}

function Microcomponent({ _key, g_dataList, g_mCRenderList }) {
  const [value, functionSet] = useState(g_dataList[_key]);
  addToMicrocomponentRender(_key, g_mCRenderList, functionSet);
  return <>{g_dataList[_key]}</>;
}

function setMicrocomponents(_key, g_dataList, g_mCRenderList, _value) {
  if (g_dataList[_key] !== _value) {
    const aux = {};
    g_dataList[_key] = _value;
    setTimeout(() => [...g_mCRenderList[_key]].forEach((fx) => fx(aux)), 0);
  }
}

function createProperties_v_mC(_key, g_dataList, g_mCRenderList) {
  const object = {};
  Object.defineProperties(object, {
    value: {
      get: () => g_dataList[_key],
      set: (value) => {
        g_dataList[_key] = value;
      },
    },
    v: {
      get: () => g_dataList[_key],
      set: (value) => {
        g_dataList[_key] = value;
      },
    },
    microComponent: {
      get: () => (
        <Microcomponent
          _key={_key}
          g_dataList={g_dataList}
          g_mCRenderList={g_mCRenderList}
        />
      ),
      set: (value) => {
        setMicrocomponents(_key, g_dataList, g_mCRenderList, value);
      },
    },
    mC: {
      get: () => (
        <Microcomponent
          _key={_key}
          g_dataList={g_dataList}
          g_mCRenderList={g_mCRenderList}
        />
      ),
      set: (value) => {
        setMicrocomponents(_key, g_dataList, g_mCRenderList, value);
      },
    },
  });
  return object;
}

export default createProperties_v_mC;