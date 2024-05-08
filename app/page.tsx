import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-between">
      <Link href="/embla">Click here for EmblaCarousel</Link>
    </main>
  );
}
