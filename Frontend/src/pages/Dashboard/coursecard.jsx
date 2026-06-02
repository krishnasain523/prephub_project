import VolumeUpIcon from '@mui/icons-material/VolumeUp';
export default function Coursecard() {
  return (<>

    <div className=" flex flex-col border border-2 border-black bg-[#ECFDF5] p-1 rounded-sm h-[250px] w-[170px]">
      <div className="h-[100px] w-full ">
        <img className="h-full w-full rounded-sm object-cover" src="./images/krishna.jpeg" alt="" />
      </div>
      <div className="mt-2 ">
        <h1 className="text-[13px] text-black">Mern Stack masterclass</h1>
        <div className="flex items-center mt-[2px] gap-2">
          <button className="p-1 flex gap-[2px] bg-[#22C55E] items-center rounded-xl text-[8px] text-white font-serif "><i class="fa-sharp fa-solid  fa-crown"></i><p>Premium</p></button>
          <div className=" flex items-center">
            <VolumeUpIcon sx={{ fontSize: 15 }} />
            <p className="text-[6px] font-serif">
              English
            </p>
          </div>
          <div>
            <p className='text-[7px] font-serif'> 4.8(6k+reviews)</p>
          </div>
        </div>
        <p className='text-[7px] font-serif mt-[2px]'>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dolores maiores rem nisi autem illum,</p>
        <button className='bg-[#22C55E] px-3 py-1 relative left-[90px] rounded-xl text-[8px] font-bold text-white'>Enroll now</button>
      </div>
    </div>

  </>)
}