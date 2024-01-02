import Image from 'next/image';
import MapImg from '../../util/images/map.png';

export const metadata = {
  title: 'Map of the Art Spaces | Index',
  description: 'Independent Art Spaces',
};
export default function Map() {
  return (
    <main className="pl-10 pt-10 pb-36 pr-10 flex ">
      <div className="border-stone-200 border-8 rounded-xl max-w-full max-h-full">
        <Image
          src={MapImg}
          alt="Photograph of a map"
          width={1300}
          height={500}
          className="rounded-xl"
        />
      </div>
    </main>
  );
}
