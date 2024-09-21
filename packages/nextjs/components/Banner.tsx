import Image from "next/image"

const Banner = ({ banner }: { banner: 1 | 2 }) => {
  return <Image src={`/banner-${banner}.png`} alt="Banner Image" layout="fill" objectFit="cover" quality={100} />
}

export default Banner
