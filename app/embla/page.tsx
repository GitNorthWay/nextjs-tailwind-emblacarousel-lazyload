import React from 'react';
import EmblaCarousel from "@/app/embla/EmblaCarousel";
import {EmblaOptionsType} from "embla-carousel";


const OPTIONS: EmblaOptionsType = {}
const SLIDE_COUNT = 5
const SLIDES = Array.from(Array(SLIDE_COUNT).keys())

function Page() {
    return (
        <div className="container">
            <EmblaCarousel slides={SLIDES} options={OPTIONS} />
        </div>
    );
}

export default Page;