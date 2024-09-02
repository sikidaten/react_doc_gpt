import { Dropfile } from './drop.js'
import { useState } from 'react'
import { Correct } from './correct.js'
import { output } from './tmpdata.js'
import { Done } from './done.js'
import { FuncSetting } from './funcsetting.js'
import Modal from 'react-modal'
import SettingsIcon from '@mui/icons-material/Settings';
import IconButton from '@mui/material/IconButton';



function App() {
  const [state, setState] = useState('select');
  const [imgSrc, setImageSrc] = useState(null);
  const [isOpenSetting,setIsOpenSetting]=useState(true);

  function appstate() {
    if (state === 'select')
      return <Dropfile setState={setState} setImageSrc={setImageSrc} />
    else if (state === 'processing')
      return <div className='box300'>
        <img src='./work.gif' className='uploadimg' />
        <p className='uploadzonetext'>PROCESSING...</p>
      </div>
    else if (state === 'processingdone')
      //TODO TRANSITION ANIMATION
      return <Correct imgsrc={imgSrc} data={output} setState={setState} />
    else if (state === 'send')
      return <Done state={state} setState={setState} />
  }
  return <>
  <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
    <IconButton size='large' onClick={()=>setIsOpenSetting(true)}>
      <SettingsIcon fontSize="inherit"/>
    </IconButton>
  </div>
    {appstate()}
    <Modal isOpen={isOpenSetting} >
      <FuncSetting setIsOpenSetting={setIsOpenSetting}/>
      </Modal>
  </>
}

export default App