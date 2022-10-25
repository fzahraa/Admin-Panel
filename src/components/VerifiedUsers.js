import React, { useState, useEffect } from "react";
import Spinner from "../utils/Spinner";
import styled from "styled-components";
import ReactPaginate from "react-paginate";
import { Button } from "@mui/material";
import { fetchVerifiedUsers } from "../features/admin/adminSlice";
import { useDispatch, useSelector } from "react-redux";
import RefreshIcon from '@mui/icons-material/Refresh';
import VerifiedIcon from '@mui/icons-material/Verified';


const VerifiedUsers = () => {

  const dispatch = useDispatch();

  const { isLoading, verifiedUsers } = useSelector(
    (state) => state.admin
  );

  const [pageNumber, setPageNumber] = useState(0);
  const usersPerPage = 10;
  const pagesVisited = pageNumber * usersPerPage;
  const pageCount = Math.ceil(verifiedUsers.length / usersPerPage);

  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };

  useEffect(() => {
    dispatch(fetchVerifiedUsers());
    // eslint-disable-next-line
  }, []);

  if (isLoading) {
    return (
      <Wrapper>
        <div className="table__refresh">
          <h1>SEARCH RESULTS</h1>
          <Button
            variant="contained"
            className="table__btn"
            color="secondary"
            endIcon={<RefreshIcon />}
            onClick={() => dispatch(fetchVerifiedUsers())}
          >
            Refresh
          </Button>
        </div>

        <div className="table__fields">
          <p>User Name</p>
          <p>Company Name</p>
          <p>Contact Number</p>
          <p>CRN Verification Status</p>
        </div>
        
        <Spinner />
      </Wrapper>
    );
  }
  return (
    <Wrapper>
      <div className="table__refresh">
        <h1>SEARCH RESULTS: {verifiedUsers.length}</h1>
        <Button
          variant="contained"
          className="table__btn"
          color="secondary"
          endIcon={<RefreshIcon />}
          onClick={() => dispatch(fetchVerifiedUsers())}
        >
          Refresh
        </Button>
      </div>

      <div className="table__fields">
        <p>User Name</p>
        <p>Company Name</p>
        <p>Contact Number</p>
        <p>CRN Verification Status</p>
      </div>


      {verifiedUsers.slice(pagesVisited, pagesVisited + usersPerPage).map((record, index) => {
        return (
          <div key={index} className="table__records">
            <p>{record.user.name_en}</p>
            <p>{record.about_en.name}</p>
            <p>{record.contact_en.number}</p>
            <p>Verified <VerifiedIcon fontSize="large" color="success" sx={{ marginLeft: "0.5rem" }} /></p>
          </div>
        );
      })
      }

      <ReactPaginate
        previousLabel={"Prev"}
        nextLabel={"Next"}
        pageCount={pageCount}
        onPageChange={changePage}
        containerClassName={"paginationBttns"}
        previousLinkClassName={"previousBttn"}
        nextLinkClassName={"nextBttn"}
        disabledClassName={"paginationDisabled"}
        activeClassName={"paginationActive"}
      />

    </Wrapper>
  );
};

export default VerifiedUsers;

const Wrapper = styled.div`
    width: 100%;
    min-height: 40rem;
    position: relative;

  .table__refresh {
    font-size: 1rem;
    color: #262626;
    margin: 1rem 0rem;
    padding: 0rem 1rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .table__btn {
    font-size: 1.5rem;
  }

  .table__fields p {
    font-size: 1.8rem;
    font-weight: 500;
    color: white;
    padding: 1.6rem;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .table__records p{
    font-size: 1.8rem;
    font-weight: 500;
    padding: 1.5rem;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .table__fields,
  .table__records {
    display: grid;
    text-align: center;
    align-items: center;
    grid-template-columns: 2fr 2fr 2fr 3fr;
  }

  .table__fields {
    background-color: #424d83;
    border-radius: 8px;
  }

  .table__records {
    margin-top: 3px;
    border-radius: 5px;
    background: #eaeafa;
  }

  .paginationBttns {
    list-style: none;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 4rem 0rem;
  }

  .paginationBttns a {
    font-size: 1.4rem;
    padding: 1rem 1.5rem;
    border-radius: 5px;
    color: #2b2eff;
    cursor: pointer;
    margin: 0rem 0.5rem;
    @media only screen and (max-width: 800px) {
      font-size: 1.2rem;
    }
  }

  .paginationActive a {
    color: white;
    background-color: #424d83;
    cursor: pointer;
  }

  .paginationDisabled a {
    color: grey;
    background-color: whitesmoke;
    cursor: not-allowed;
  }
`;
