import styled from 'styled-components'
import Navbar from '../components/Navbar'
import Announcement from '../components/Announcement'
import Products from '../components/Products'
import Newsletter from '../components/Newsletter'
import Footer from '../components/Footer';
// import {mobile} from '../responsive'
import { useLocation } from 'react-router-dom'
import { useState } from 'react'


const Container = styled.div`
   
`;

const Title = styled.h1`
   margin: 20px;
`;

// const FilterContainer = styled.div`
//    display: flex;
//    justify-content: space-between;
// `;

// const Filter = styled.div`
//    margin: 20px;
//    ${mobile({ width: '0px 20px', display: 'flex', flexDirection: 'column'})}
// `;

// const FilterText = styled.span`
//    font-size: 20px;
//    font-weight: 600;
//    margin-right: 20px;
//    ${mobile({ marginRight: '0px'})}
// `
// const Select = styled.select`
//    padding: 20px;
//    margin-right: 20px;
//    cursor: pointer;
//    ${mobile({ margin: '10px 0px'})}
// `;

// const Option = styled.option`
  
// `;

const ProductList = () => {
    const location = useLocation();
    const cat = location.pathname.split('/')[2];
    const [filters, setFilter] = useState({})
    const [sort, setSort] = useState('newest')

   console.log(setFilter)
   console.log(setSort)
  return (
    <Container>
        <Navbar/>
        <Announcement/>
        <Title>{cat}</Title>
        {/* <FilterContainer>
            <Filter>
                <FilterText>
                    Filter Prodcuts:
                </FilterText>
                <Select name='color' onChange={handleFilter}>
                    <Option disabled >
                        Color
                    </Option>
                    <Option>white</Option>
                    <Option>black</Option>
                    <Option>red</Option>
                    <Option>blue</Option>
                    <Option>yellow</Option>
                    <Option>green</Option>
                </Select>
                <Select name='size' onChange={handleFilter}>
                    <Option disabled >
                        Size
                    </Option>
                    <Option>xs</Option>
                    <Option>s</Option>
                    <Option>m</Option>
                    <Option>l</Option>
                    <Option>xl</Option>
                </Select>
            </Filter>
            <Filter>
                <FilterText>
                    Sort Prodcuts:
                </FilterText>
                <Select onChange={(e) => setSort(e.target.value)}>
                    <Option value='newest'>Newest</Option>
                    <Option value='asc'>Price (asc)</Option>
                    <Option value='desc'>Price (desc)</Option>
                </Select>
            </Filter>
        </FilterContainer> */}
        <Products cat={cat} filters={filters} sort={sort}/>
        <Newsletter/>
        <Footer/>
    </Container>
  )
}

export default ProductList