import { ButtonGroup } from "@mui/material";
import React, { useEffect , useState}  from "react";
import styled from "styled-components";
import SearchIcon from "@mui/icons-material/Search";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import { Link } from "react-router-dom";
import Form from "react-bootstrap/Form";
import axios from "axios";
import { NavDropdown } from 'react-bootstrap';
import { Icon } from '@iconify/react';
import user from '@iconify/icons-mdi/user-circle-outline';
import setting from '@iconify/icons-mdi/settings-helper';
import edit from  '@iconify/icons-mdi/note-edit-outline';
import view from  '@iconify/icons-mdi/eye';
import add from  '@iconify/icons-mdi/users-add';
import trash from  '@iconify/icons-mdi/trash-can';
import feedback from  '@iconify/icons-mdi/feedback-outline';
import text from  '@iconify/icons-mdi/format-text';
import exit from  '@iconify/icons-mdi/exit-to-app';
import "./home.css";
import swal from 'sweetalert';
import { useHistory } from "react-router-dom";
import Tooltip from 'react-bootstrap/Tooltip';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function Header() {

    const history = useHistory();
    const [results, setResults] = useState([]);
    const [searchBarcode, setSearchBarcode] = useState("");

    const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
    
    useEffect(() => {
        axios.get('/api/data')
        .then((response) => {
          setResults(response.data.data);
        });
      }, []);

      const logoutSubmit = (e) => {
        e.preventDefault();
    
        axios.post(`/api/logout`).then(res =>{
          if(res.data.status === 200)
          {
            localStorage.removeItem('auth_token');
            localStorage.removeItem('auth_name');
            swal("Success", res.data.message,"success");
            history.push('/')
          }
        })
      }
      
    
      var AuthButtons = '';
      if(!localStorage.getItem('auth_token'))
      {
    
      }
      else {
        AuthButtons = (
          <li className="nav-item">
              <a href="#" onClick={logoutSubmit} className="logout" >{<Icon icon={exit} style={{fontSize:'30px',color:"black"}} />} Logout</a>
          </li>
        )
      }
    
      const filterBarcode = results.filter((item) => {
        return searchBarcode !== "" ? item.projectName === searchBarcode : item;;
      });
    
      const searchResults = filterBarcode.map((data, i) => {
        return (
    <div className="container">
      <div className="row" >
      <div class="col-8" key={i}>
    <div class="profile-card-4 text-center">
        <div class="profile-content"><img src='https://cdn.onlinewebfonts.com/svg/img_246830.png' alt="" srcSet='https://cdn.onlinewebfonts.com/svg/img_246830.png x1'  class="img img-responsive" />
            <div class="profile-description">Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor.</div>
           </div>
        </div>
        <div className="container shadow" style={{maxWidth: '300px',backgroundColor:'#fff',margin: '-9px auto',borderRadius:'5px', boxShadow: '0xp 0px 25px rgba(0,0,0,0.1)'}}>
            <div className="row">
              <div className="col"> <Link to={`page/${data.identifier}`} className="logout" > <span style={{fontSize:'19px',marginTop: '50px'}}>{data.projectName}</span></Link> </div>
             <div className="col">
             <OverlayTrigger
        overlay={(props) => (
          <Tooltip {...props}>
            Site Actions
          </Tooltip>
        )}
        placement="top"
      >
    <NavDropdown title={<Icon icon={setting} style={{fontSize:'30px',transform: 'rotate(90deg)',textAlign: 'center'}} data-bs-toggle="tooltip" data-bs-placement="top" title="Tooltip on top"/>} id="basic-nav-dropdown" className="no-arrow" style={{marginLeft:'70px'}}>
    <NavDropdown.Item  > <Link to={'#!'}  className="logout "  onClick={handleShow}>{<Icon icon={text} style={{fontSize:'20px'}} />}   Rename</Link></NavDropdown.Item>
    <NavDropdown.Item  > <Link to={''}  className="logout">{<Icon icon={feedback} style={{fontSize:'20px',color:"black"}} />}   Get Feedback</Link></NavDropdown.Item>
      <NavDropdown.Item > <Link to={`edit/${data.id}`} className="logout">{<Icon icon={edit} style={{fontSize:'20px',color:"black"}} />}   Customize</Link></NavDropdown.Item>
      <NavDropdown.Item > <Link to={`page/${data.identifier}`} className="logout">{<Icon icon={view} style={{fontSize:'20px',color:"black"}} />}   Veiw Live Site</Link></NavDropdown.Item>
      <NavDropdown.Divider />
      <NavDropdown.Item > <Link to={''} className="logout">{<Icon icon={add} style={{fontSize:'20px',color:"black"}} />}   Add Collaborators</Link></NavDropdown.Item>
      <NavDropdown.Divider />
      <NavDropdown.Item > <Link to={''} className="logout">{<Icon icon={trash} style={{fontSize:'20px',color:"black"}} />}   Move to Trash</Link></NavDropdown.Item>
    </NavDropdown>
       </OverlayTrigger>
             </div>
           </div>
    </div>
      </div>
      </div>
      <Modal className="bg-light" show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Rename your site</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <label htmlFor="" className="form-label">RENAME</label><br />
          <input type="text" className="form-control" />
          <button type="submit" className="btn btn-primary btn-md">Save the new name</button>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
      <br />
      </div>
        );
      });
  return (
    <>
    <Container>
      <Wrapper>
        <Link to="/home">
          <Logo>
          <a href="/home"><img style={{filter: 'invert(1)', height:'15px', width: '120px'}} src="https://geekulcha.dev/logo_white.png" class="img-responsive site-logo" alt="logo" /></a>
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
            <NavDropdown.Item >  {AuthButtons}  </NavDropdown.Item>
          </NavDropdown>
          </RightSection>
        </RightContainer>
      </Wrapper>
    </Container>
     <Display>
    <Main >
    <Title>
      <span>My Sites</span>
    </Title>
    <FileContent>
      <GridContainer>
      {searchResults} 
      </GridContainer>
    </FileContent>
  </Main>
  </Display> 
    </>
  );

}


export default Header

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
