import React, { useContext, useEffect, useState } from 'react';
import FooterMenu from './FooterMenu';
import Header from './Header';
import MyContext from '../Context/MyContext';
import { getNationalities, getByNationality } from '../Services/MealDB';
import ItemCard from './ItemCard';

function NationalitiesFoods() {
  const { setHeaderTitle, setSearchHiden, foodData } = useContext(MyContext);
  const [nationalitiesData, setNationalitiesData] = useState([]);
  const [filteredData, setFilteredData] = useState(null);
  useEffect(() => {
    setHeaderTitle('Explore Nationalities');
    setSearchHiden(true);
    const getNationality = async () => {
      const result = await getNationalities();
      setNationalitiesData(result);
    };
    getNationality();
  }, [setHeaderTitle, setSearchHiden]);

  const filterByNationality = async (nationality) => {
    if (nationality === 'All') return setFilteredData(null);
    const result = await getByNationality(nationality);
    setFilteredData(result);
  };

  return (
    <main>
      <Header />
      <select
        onChange={ ({ target }) => filterByNationality(target.value) }
        data-testid="explore-by-nationality-dropdown"
      >
        <option
          onChange={ ({ target }) => filterByNationality(target.value) }
          data-testid="All-option"
        >
          All
        </option>
        {nationalitiesData.map((item) => (
          <option
            key={ item.strArea }
            data-testid={ `${item.strArea}-option` }
          >
            {item.strArea}
          </option>
        ))}
      </select>
      <ItemCard data={ filteredData || foodData } type="Meal" />
      <FooterMenu />
    </main>
  );
}

export default NationalitiesFoods;
