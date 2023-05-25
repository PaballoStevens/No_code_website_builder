import { useEffect , useState} from 'react';
import axios from 'axios';
import React from 'react';
import { Link} from 'react-router-dom';
import Form from "react-bootstrap/Form";
import "./template.css";
import { FaCheck, FaEye } from 'react-icons/fa';
import { ButtonGroup } from "@mui/material";
import { NavDropdown } from 'react-bootstrap';
import { Icon } from '@iconify/react';
import user from '@iconify/icons-mdi/user-circle-outline';
import styled from "styled-components";
import SearchIcon from "@mui/icons-material/Search";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";

function Templates() {
    const [results, setResults] = useState([]);
    const [searchBarcode, setSearchBarcode] = useState("");
       useEffect(() => {
        axios.get(`/api/get-templates`)
        .then((response) => {
          setResults(response.data.data);
        });
      }, []);
    
      const filterBarcode = results.filter((item) => {
        return searchBarcode !== "" ? item.name === searchBarcode : item;;
      });
    
      const searchResults = filterBarcode.map((data, i) => {
        return (
           <div className="col-sm-4"  key={i}>
           <div className="card box">
             <div className="card-body">
               <img src={data.image} className='img-fluid template-img' srcSet='' />
               <br />
               <br />
               <h5 className="card-title">{data.name}</h5>
               <p className="card-text">With supporting text below as a natural lead-in to additional content.</p>
               <Link to={`view-template/${data.identifier}`} className="btn bg-primary text-white link-item m-2"><FaEye/> View</Link>  
               <Link to={`edit-template/${data.id}`} className="btn btn-success link-item"><FaCheck/> Customize</Link>
             </div>
           </div>
           <br></br>
         </div>
         
        );
      });
  return (
    <>
    <Container>
      <Wrapper>
        <Link to="/home">
          <Logo>
          <a href="/"><img style={{filter: 'invert(1)', height:'15px', width: '120px'}} src="https://geekulcha.dev/logo_white.png" class="img-responsive site-logo" alt="logo" /></a>
          </Logo>
        </Link>
        <InputContainer>
          <SearchContainer>
            <ButtonGroup>
              <SearchIcon />
            </ButtonGroup>
            <Form>
            <input type="text" placeholder="Search for a site... "  onChange={(e) => setSearchBarcode(e.target.value)} />
           </Form>
          </SearchContainer>
        </InputContainer>

        <RightContainer>
          <LeftSection>
            <HelpOutlineIcon />
            <SettingsOutlinedIcon />
          </LeftSection>
          <RightSection>
          <NavDropdown title={<Icon icon={user} style={{fontSize:'40px'}}/>} id="basic-nav-dropdown" className="no-arrow">
            <NavDropdown.Item >  </NavDropdown.Item>
          </NavDropdown>
          </RightSection>
        </RightContainer>
      </Wrapper>
    </Container>
     <Display>
    <Main >
    <Title>
      <span>Templates</span>
    </Title>
    <FileContent>
      <div className="row p-10 d-flex test">
       {searchResults}
     </div>
    </FileContent>
  </Main>
  </Display> 
    </>
   
  )
}

export default Templates

const Display = styled.div`
  display: flex;
`;

const Container = styled.div`
  position: sticky;
  top: 0;
  z-index: 999;
  background-color: #ffffff;
  padding: 2px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.2);
`;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 10px 20px;

`;

const Logo = styled.div`
  display: flex;
  align-items: center;

  img {
    width: 40px;
    height: 40px;
  }

  span {
    font-family: "Product Sans", Arial, sans-serif;
    color: #5f6368;
    font-size: 22px;
    padding-left: 8px;
  }
`;

const InputContainer = styled.div`
  flex: 1;
`;

const RightContainer = styled.div`
  display: flex;
  align-items: center;
`;

const SearchContainer = styled.div`
  width: 64%;
  height: 50px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.09);
  border-radius: 8px;
  box-shadow: 0 1px 2px 0 rgb(0 0 0 /0.05);

  svg {
    margin-left: 10px;
    color: #5f6368;
  }

  input {
    font-size: 16px;
    width: 90%;
    height: 80%;
    font-family: Sans, Roboto, RobotoDraft, Helvetica, Arial, sans-serif;
    margin: 0 auto;
    background-color: transparent;
    :focus {
      outline: none;
    }

    border: none;
  }
`;

const RightSection = styled.div`
  display: flex;
  align-items: center;

  svg {
    color: #5f6368;
    padding: 5px;
    cursor: pointer;
    border-radius: 50%;
    transition: all 200ms ease-out;
    :hover {
      background-color: rgba(0, 0, 0, 0.09);
    }
  }

  .app {
    margin-right: 15px;
  }
`;

const LeftSection = styled(RightSection)`
  margin-right: 40px;

  svg {
    margin: 0 10px;
  }
`;
const List = styled.div`
  max-width: 300px;
  max-height: 400px;
  height: 209px;
  display: flex;
  flex-direction: column;
  border-radius: 20px;
  margin: 10px 0;
  box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 /0.1);
`;

const PhotoContainer = styled.div`
  height: 60%;
  width: 100%;
  background-color: lightgray;
  border-top-left-radius: inherit;
  border-top-right-radius: inherit;

  img {
    height: 100%;
    width: 100%;
    border-top-left-radius: inherit;
    border-top-right-radius: inherit;
    object-fit: contain;
    border-bottom: 1px solid rgba(0, 0, 0, 0.2);
  }
`;

const PhotoTitle = styled.div`
  display: flex;
  align-items: center;
  margin-top: 20px;
  margin-left: 10px;
  svg {
    color: #70b5f9;
  }

  span {
    color: rgba(0, 0, 0, 0.72);
    margin-left: 28px;
    padding-bottom: 4px;
    font-size: 13px;
    font-weight: 600;
  }
`;

const Main = styled.div`
  flex-grow: 1;
  position: relative;
  display: flex;
  flex-direction: column;
  padding: 15px 30px;
`;

const Title = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  border-bottom: 1px solid rgba(0, 0, 0, 0.2);
  padding-bottom: 13px;

  svg {
    margin-left: 10px;
    color: #5f6368;
  }

  span {
    font-family: Google Sans, Roboto, RobotoDraft, Helvetica, Arial, sans-serif;
    font-weight: 400;
    font-size: 18px;
    color: #202124;
  }
`;

const FileContent = styled.div`
  display: flex;
  flex-direction: column;
  padding-top: 20px;
  overflow-y: scroll;
  flex-grow: 1;
  max-height: 100vh;
  margin-bottom: 30px;

  ::-webkit-scrollbar {
    width: 15px;
  }

  ::-webkit-scrollbar-track {
    background-color: rgba(0, 0, 0, 0.2);
    border-radius: 20px;
  }

  ::-webkit-scrollbar-thumb {
    background-color: rgba(0, 0, 0, 0.2);
    border-radius: 20px;
    transition: all 200ms ease-out;
    max-height: 100px;

    :hover {
      background-color: rgba(0, 0, 0, 0.3);
    }
  }
`;

const SemiTitle = styled.div`
  font-size: 14px;
  font-weight: 500;
  text-transform: capitalize;
  color: #5f6368;
`;

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  margin: 20px 0;
`;
