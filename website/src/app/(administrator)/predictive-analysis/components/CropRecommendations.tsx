import React, { useState, useEffect } from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler } from 'chart.js';
import Image from 'next/image';
import 'react-datepicker/dist/react-datepicker.css';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FaChevronRight, FaChevronLeft } from 'react-icons/fa';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler);

interface DataPoint {
  date: string;
  soilMoisture: number;
  soilTemperature: number;
  airHumidity: number;
  airTemperature: number;
  lightIntensity: number;
}

interface PlantImage {
  url: string;
  name: string;
  plantDate: string;
}

interface CropRecommendationsProps {
  data: DataPoint[];
}

const CropRecommendations: React.FC<CropRecommendationsProps> = ({ data }) => {
  const [plantImages, setPlantImages] = useState<PlantImage[]>([]);

  useEffect(() => {
    const fetchPlantImages = async () => {
      const images = await mockLambdaFunctionForImages();
      setPlantImages(images);
    };

    fetchPlantImages();
  }, []);

  const CustomNextArrow = (props: any) => {
    const { className, onClick } = props;
    return (
      <div className={`${className} custom-arrow next-arrow`} onClick={onClick}>
        <FaChevronRight className="text-4xl text-green-500" />
      </div>
    );
  };

  const CustomPrevArrow = (props: any) => {
    const { className, onClick } = props;
    return (
      <div className={`${className} custom-arrow prev-arrow`} onClick={onClick}>
        <FaChevronLeft className="text-4xl text-green-500" />
      </div>
    );
  };

  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    nextArrow: <CustomNextArrow />,
    prevArrow: <CustomPrevArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
        }
      }
    ]
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Recomendações para plantar:</h2>
        <div className="relative">
          <Slider {...settings}>
            {plantImages.map((image, index) => (
              <div key={index} className="px-2">
                <div className="bg-white p-4 rounded-lg shadow-md flex flex-col items-center h-64">
                  <div className="w-32 h-32 relative mb-2">
                    <Image 
                      src={image.url}
                      alt={image.name}
                      layout="fill"
                      objectFit="contain"
                    />
                  </div>
                  <h3 className="text-lg font-semibold">{image.name}</h3>
                  <p className="text-sm text-gray-600">Plantar em: {image.plantDate}</p>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </div>
  );
};

const mockLambdaFunctionForImages = (): Promise<PlantImage[]> => {
  return Promise.resolve([
    { url: '/images/tomato.png', name: 'Tomate', plantDate: '15/05/2023' },
    { url: '/images/lettuce.png', name: 'Alface', plantDate: '01/06/2023' },
    { url: '/images/carrot.png', name: 'Cenoura', plantDate: '10/06/2023' },
    { url: '/images/cucumber.png', name: 'Pepino', plantDate: '20/06/2023' },
    { url: '/images/bell-pepper.png', name: 'Pimentão', plantDate: '05/07/2023' },
    { url: '/images/broccoli.png', name: 'Brócolis', plantDate: '15/07/2023' },
    { url: '/images/eggplant.png', name: 'Berinjela', plantDate: '25/07/2023' },
  ]);
};

export default CropRecommendations;