import { useState } from 'react'
import ScrollToBottom from 'react-scroll-to-bottom'
import IconButton from '@mui/material/IconButton'
import SendIcon from '@mui/icons-material/Send';

function App() {
  const [count, setCount] = useState(0)

  const sendPrompt = () => {
    console.log("Send")
  }

  return (
    <main className='min-h-screen h-full flex text-white overflow-hidden' >
      <div className='bg-neutral-900 w-60 h-screen fixed'>
        Menu
      </div>
      <div className='bg-gray-800 ml-60 h-screen w-full flex flex-col relative'>
        <ScrollToBottom 
          followButtonClassName='bg-down-arrow bg-[length:75%_75%] bg-center mb-[45px] bg-no-repeat bg-white bg-opacity-0 hover:bg-opacity-100' 
          className='h-[97%] w-full' 
          scrollViewClassName='scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-800 px-10 py-4'
        >
          {/* <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam hendrerit convallis risus quis interdum. Vestibulum semper posuere vestibulum. Donec sit amet feugiat lectus. Sed rutrum nunc eu dui iaculis, in convallis purus elementum. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sit amet lorem ligula. Etiam bibendum, eros a tempor finibus, elit augue elementum felis, nec pretium neque tellus ut ipsum. Nam nec ligula mollis, congue nisi id, commodo orci. Sed scelerisque felis quis scelerisque gravida.

            Cras porttitor sodales leo pretium suscipit. Curabitur tortor enim, congue non nulla a, facilisis porttitor sem. Aliquam erat volutpat. Nulla sagittis gravida eros, et porta lorem volutpat finibus. Nulla suscipit vulputate erat vel vestibulum. Vivamus blandit ligula eget lectus tristique, non varius leo vestibulum. Vestibulum eu ultrices purus. Phasellus vitae orci lobortis, scelerisque erat in, congue nibh. Maecenas in nulla scelerisque, hendrerit mauris vel, posuere ligula. Vivamus malesuada odio at ante hendrerit, vitae volutpat leo pharetra. Vivamus eleifend egestas molestie.

            Nullam sollicitudin magna quam, non ultrices turpis efficitur sed. Morbi cursus nunc quis erat finibus egestas. Maecenas pulvinar ut dolor at suscipit. Integer risus nisl, eleifend dapibus diam id, auctor ultricies ex. Proin vel sagittis lectus, sed commodo erat. Pellentesque at semper augue, a semper enim. Integer in pulvinar magna, at varius erat.

            Proin ac nibh pellentesque, faucibus magna vitae, faucibus nunc. Fusce at rutrum odio. Vivamus quis tincidunt magna. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Vivamus ac vulputate mi. Integer fringilla mauris ipsum, vitae ultricies leo ultrices eget. Suspendisse elementum sem vel ex porta dignissim. Praesent non felis sagittis, mollis mi in, laoreet justo. Nam quis blandit turpis. In hac habitasse platea dictumst. Fusce id libero interdum, volutpat lectus molestie, egestas orci. Donec mattis lacinia lorem, non iaculis massa bibendum tincidunt. Cras sagittis, dui vel dignissim mollis, ligula massa maximus velit, a pretium lorem velit tincidunt ex.

            Maecenas eu orci ac risus mattis egestas. Praesent venenatis ultricies ligula eget dictum. Phasellus fermentum ultricies tincidunt. Etiam elementum molestie lorem, in lobortis justo congue eu. Maecenas id aliquam massa. Nulla sodales lacus lectus, id vulputate ligula tincidunt id. Praesent nec viverra purus, eu tincidunt nisi. In vitae ligula vitae turpis elementum egestas vel et risus. Donec commodo magna a erat sollicitudin fringilla.</p>      
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam hendrerit convallis risus quis interdum. Vestibulum semper posuere vestibulum. Donec sit amet feugiat lectus. Sed rutrum nunc eu dui iaculis, in convallis purus elementum. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sit amet lorem ligula. Etiam bibendum, eros a tempor finibus, elit augue elementum felis, nec pretium neque tellus ut ipsum. Nam nec ligula mollis, congue nisi id, commodo orci. Sed scelerisque felis quis scelerisque gravida.

Cras porttitor sodales leo pretium suscipit. Curabitur tortor enim, congue non nulla a, facilisis porttitor sem. Aliquam erat volutpat. Nulla sagittis gravida eros, et porta lorem volutpat finibus. Nulla suscipit vulputate erat vel vestibulum. Vivamus blandit ligula eget lectus tristique, non varius leo vestibulum. Vestibulum eu ultrices purus. Phasellus vitae orci lobortis, scelerisque erat in, congue nibh. Maecenas in nulla scelerisque, hendrerit mauris vel, posuere ligula. Vivamus malesuada odio at ante hendrerit, vitae volutpat leo pharetra. Vivamus eleifend egestas molestie.

Nullam sollicitudin magna quam, non ultrices turpis efficitur sed. Morbi cursus nunc quis erat finibus egestas. Maecenas pulvinar ut dolor at suscipit. Integer risus nisl, eleifend dapibus diam id, auctor ultricies ex. Proin vel sagittis lectus, sed commodo erat. Pellentesque at semper augue, a semper enim. Integer in pulvinar magna, at varius erat.

Proin ac nibh pellentesque, faucibus magna vitae, faucibus nunc. Fusce at rutrum odio. Vivamus quis tincidunt magna. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Vivamus ac vulputate mi. Integer fringilla mauris ipsum, vitae ultricies leo ultrices eget. Suspendisse elementum sem vel ex porta dignissim. Praesent non felis sagittis, mollis mi in, laoreet justo. Nam quis blandit turpis. In hac habitasse platea dictumst. Fusce id libero interdum, volutpat lectus molestie, egestas orci. Donec mattis lacinia lorem, non iaculis massa bibendum tincidunt. Cras sagittis, dui vel dignissim mollis, ligula massa maximus velit, a pretium lorem velit tincidunt ex.

Maecenas eu orci ac risus mattis egestas. Praesent venenatis ultricies ligula eget dictum. Phasellus fermentum ultricies tincidunt. Etiam elementum molestie lorem, in lobortis justo congue eu. Maecenas id aliquam massa. Nulla sodales lacus lectus, id vulputate ligula tincidunt id. Praesent nec viverra purus, eu tincidunt nisi. In vitae ligula vitae turpis elementum egestas vel et risus. Donec commodo magna a erat sollicitudin fringilla.</p>
<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam hendrerit convallis risus quis interdum. Vestibulum semper posuere vestibulum. Donec sit amet feugiat lectus. Sed rutrum nunc eu dui iaculis, in convallis purus elementum. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sit amet lorem ligula. Etiam bibendum, eros a tempor finibus, elit augue elementum felis, nec pretium neque tellus ut ipsum. Nam nec ligula mollis, congue nisi id, commodo orci. Sed scelerisque felis quis scelerisque gravida.

            Cras porttitor sodales leo pretium suscipit. Curabitur tortor enim, congue non nulla a, facilisis porttitor sem. Aliquam erat volutpat. Nulla sagittis gravida eros, et porta lorem volutpat finibus. Nulla suscipit vulputate erat vel vestibulum. Vivamus blandit ligula eget lectus tristique, non varius leo vestibulum. Vestibulum eu ultrices purus. Phasellus vitae orci lobortis, scelerisque erat in, congue nibh. Maecenas in nulla scelerisque, hendrerit mauris vel, posuere ligula. Vivamus malesuada odio at ante hendrerit, vitae volutpat leo pharetra. Vivamus eleifend egestas molestie.

            Nullam sollicitudin magna quam, non ultrices turpis efficitur sed. Morbi cursus nunc quis erat finibus egestas. Maecenas pulvinar ut dolor at suscipit. Integer risus nisl, eleifend dapibus diam id, auctor ultricies ex. Proin vel sagittis lectus, sed commodo erat. Pellentesque at semper augue, a semper enim. Integer in pulvinar magna, at varius erat.

            Proin ac nibh pellentesque, faucibus magna vitae, faucibus nunc. Fusce at rutrum odio. Vivamus quis tincidunt magna. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Vivamus ac vulputate mi. Integer fringilla mauris ipsum, vitae ultricies leo ultrices eget. Suspendisse elementum sem vel ex porta dignissim. Praesent non felis sagittis, mollis mi in, laoreet justo. Nam quis blandit turpis. In hac habitasse platea dictumst. Fusce id libero interdum, volutpat lectus molestie, egestas orci. Donec mattis lacinia lorem, non iaculis massa bibendum tincidunt. Cras sagittis, dui vel dignissim mollis, ligula massa maximus velit, a pretium lorem velit tincidunt ex.

            Maecenas eu orci ac risus mattis egestas. Praesent venenatis ultricies ligula eget dictum. Phasellus fermentum ultricies tincidunt. Etiam elementum molestie lorem, in lobortis justo congue eu. Maecenas id aliquam massa. Nulla sodales lacus lectus, id vulputate ligula tincidunt id. Praesent nec viverra purus, eu tincidunt nisi. In vitae ligula vitae turpis elementum egestas vel et risus. Donec commodo magna a erat sollicitudin fringilla.</p>  
        <div className='h-[70px]'/> */}
        </ScrollToBottom>
        <div className='absolute bottom-0 right-0 h-[85px] w-full flex items-center justify-center z-10'>
          <input type='text' id='prompt' className='bg-slate-600 w-full h-1/2 ml-2 mr-4 p-3 rounded-md focus:outline-0'/>
          <IconButton className='hover:border-2 hover:!bg-gray-900 !absolute right-6' onClick={sendPrompt}>
            <SendIcon htmlColor='white'/>
          </IconButton>
        </div>
      </div>
    </main>
  )
}

export default App
