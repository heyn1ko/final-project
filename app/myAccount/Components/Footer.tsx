import Image from 'next/image';
import FcbkImg from '../../../util/images/fcbklogo.svg';
import InstImg from '../../../util/images/instlogo.svg';
import TktkImg from '../../../util/images/tktklogo.svg';
import XImg from '../../../util/images/xlogo.svg';
import YtbImg from '../../../util/images/ytblogo.svg';

export default function Footer() {
  return (
    <footer className="font-display font-[300] p-2 mb-0 mt-44 pl-10 pr-10 outline-dotted flex flex-col md:flex-row justify-between items-center m-0">
      {/* Right Side */}
      <div className="flex items-center space-x-4 space-y-1">
        <p>FOLLOW US ON</p>
        {/* Your logos here */}
        <div className="flex space-x-2">
          <Image src={FcbkImg} alt="Logo of Facebook" width={40} height={40} />
          <Image src={TktkImg} alt="Logo of TikTok" width={40} height={40} />
          <Image src={XImg} alt="Logo of X" width={40} height={40} />
          <Image src={InstImg} alt="Logo of Instagram" width={40} height={40} />
          <Image src={YtbImg} alt="Logo of YouTube" width={40} height={40} />
        </div>
      </div>
      {/* Left Side */}
      <div className="flex items-center space-x-4 space-y-1">
        {/* Add your input box here */}
        <p>STAY UP TO DATE</p>
        <input
          type="text"
          placeholder="ENTER YOUR EMAIL"
          className="border border-gray-300 rounded-md w-60 px-2 py-1 mt-2 outline-dotted"
        />
        <button className="bg-black text-zinc-300 rounded-md	p-1 w-28 h-9">
          SUBSCRIBE
        </button>
      </div>
    </footer>
  );
}
