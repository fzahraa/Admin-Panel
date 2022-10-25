import React, { useState, useEffect } from "react";
import Spinner from "../utils/Spinner";
import styled from "styled-components";
import ReactPaginate from "react-paginate";
import { Button, CircularProgress } from "@mui/material";
import { fetchNonVerifiedUsers, fetchSubscriptionPendingUsers } from "../features/admin/adminSlice";
import { useDispatch, useSelector } from "react-redux";
import RefreshIcon from '@mui/icons-material/Refresh';
import axios from "axios";
import { toast } from 'react-toastify';
import CameraAltIcon from '@mui/icons-material/CameraAlt';

const SubscriptionPendingUsers = () => {

    const dispatch = useDispatch();
    const [clickedState, setClickedState] = useState(false);

    
    const { isLoading, subscriptionPendingUsers } = useSelector(
        (state) => state.admin
    );
    console.log(subscriptionPendingUsers);

    const [show, setShow] = useState(false);
    const [update, setUpdate] = useState(false);
    const [image, setImage] = useState("");
    const [pageNumber, setPageNumber] = useState(0);
    const usersPerPage = 10;
    const pagesVisited = pageNumber * usersPerPage;
    const pageCount = Math.ceil(subscriptionPendingUsers.length / usersPerPage);

    const changePage = ({ selected }) => {
        setPageNumber(selected);
    };

    useEffect(() => {
        dispatch(fetchSubscriptionPendingUsers());
        // eslint-disable-next-line
    }, [update]);
    const openImage = (img) =>{
        setImage(img);
        setClickedState(!clickedState);

        console.log(img);
    };
    const handleShowDialog = (img) => {
      console.log(img);
        setImage(img);
        setClickedState(!clickedState);
      };
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
                        onClick={() => dispatch(fetchNonVerifiedUsers())}
                    >
                        Refresh
                    </Button>
                </div>

                <div className="table__fields">
                    <p>User Name</p>
                    <p>Company Name</p>
                    <p>Contact Number</p>
                    <p>CRN</p>
                    <p>Payment</p>
                    <p>Verify CRN</p>
                </div>
                <Spinner />
            </Wrapper>
        );
    }

    return (
        <Wrapper>
            <div className="table__refresh">
                <h1>SEARCH RESULTS: {subscriptionPendingUsers.length}</h1>
                <Button
                    variant="contained"
                    className="table__btn"
                    color="secondary"
                    endIcon={<RefreshIcon />}
                    onClick={() => dispatch(fetchSubscriptionPendingUsers())}
                >
                    Refresh
                </Button>
            </div>

            <div className="table__fields">
                <p>User Name</p>
                <p>Company Name</p>
                <p>Contact Number</p>
                <p>CRN</p>
                <p>Payment</p>
                <p>Verify CRN</p>
            </div>


            {subscriptionPendingUsers.slice(pagesVisited, pagesVisited + usersPerPage).map((record, index) => {
                return (
                    <div key={index} className="table__records">
                        <p>{record.user.name_en}</p>
                        <p>{record.about_en.name}</p>
                        <p>{record.contact_en.number}</p>
                        <p>{record.about_en.registrationNumber}</p>
                        <p><CameraAltIcon onClick = {()=>openImage(record.subscriptionVerificationImage)} style={{"fontSize" : "30px", "cursor" : "pointer"}} /></p>
                        {clickedState && (
          <dialog
            className="dialog"
            style={{ position: "absolute" }}
            open
            onClick={()=>openImage(record.subscriptionVerificationImage)}
          >
            <img
              className="image"
              src= {image}
              onClick={()=>openImage(record.subscriptionVerificationImage)}
              alt="no image"
            />
          </dialog>
        )}
                        <p>
                            <Button
                                variant="contained"
                                className="table__btn"
                                color="success"
                                endIcon={show && <CircularProgress size="2rem" />}
                                onClick={() => {
                                    setShow(true);
                                    axios.patch("http://localhost:8000/api/admin/updateSubsProfile", { id: record._id, subscriptionVerified: true }).then((response) => {
                                        setShow(false);
                                        if (response.data.status === "SUCCESS") {
                                            toast.success("Subscription is verified", {
                                                position: "top-center",
                                            });
                                            setUpdate(true);
                                        }
                                        else if (response.data.status === "FAILURE") {
                                            toast.success(response.data.message, {
                                                position: "top-center",
                                            });
                                        }
                                    })
                                }}
                            >
                                {show ? "Verifying" : "Verify"}
                            </Button>
                        </p>
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

export default SubscriptionPendingUsers;

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
  }

  .table__records p{
    font-size: 1.8rem;
    font-weight: 500;
    padding: 1rem;
  }

  .table__fields,
  .table__records {
    display: grid;
    text-align: center;
    align-items: center;
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr;
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
