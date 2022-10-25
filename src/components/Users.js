import React, { useState } from "react";
import styled from "styled-components";
import VerifiedUsers from "./VerifiedUsers";
import NonVerifiedUsers from "./NonVerifiedUsers";
import { Button } from "@mui/material";
import logo from "../images/logo.png";
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import GppBadIcon from '@mui/icons-material/GppBad';
import SubscriptionPendingUsers from "./SubscriptionPendingUsers";


const Users = () => {

    const [table, setTable] = useState("NonVerifiedUsers");

    const handleShift = (table) => {
        setTable(table);
    }

    function _renderTableContent(table) {
        switch (table) {
            case "NonVerifiedUsers": return <NonVerifiedUsers></NonVerifiedUsers>
            case "VerifiedUsers": return <VerifiedUsers></VerifiedUsers>;
            case "SubscriptionPendingUsers": return <SubscriptionPendingUsers></SubscriptionPendingUsers>;
            default:
                return <div>Not Found</div>;
        }
    }

    return (
        <Wrapper>
            <div className="sidenav">
                <div className="sidenav__logo">
                    <img src={logo} alt="Logo" />
                </div>
                <Button
                    className={table === "NonVerifiedUsers" ? "sidenav__btnactive" : "sidenav__btn"}
                    variant="contained"
                    onClick={() => handleShift("NonVerifiedUsers")}
                    endIcon={<GppBadIcon />}
                >
                    Non-Verified Users
                </Button>
                <Button
                    className={table === "VerifiedUsers" ? "sidenav__btnactive" : "sidenav__btn"}
                    variant="contained"
                    onClick={() => handleShift("VerifiedUsers")}
                    endIcon={<VerifiedUserIcon />}
                >
                    Verified Users
                </Button>
                <Button
                    className={table === "SubscriptionPendingUsers" ? "sidenav__btnactive" : "sidenav__btn"}
                    variant="contained"
                    onClick={() => handleShift("SubscriptionPendingUsers")}
                    endIcon={<GppBadIcon />}
                >
                    Subscription Pending
                </Button>
            </div>
            <div className="sidedata">
                {_renderTableContent(table)}
            </div>
        </Wrapper>
    )
};

export default Users;

const Wrapper = styled.div`
    width: 100vw;
    display: flex;
    justify-content: center;
    align-items: start;

    .sidenav {
        position: sticky;
        top: 0;
        z-index: 1;
        width: 20%;
        height: 100vh;
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: center;
        padding: 1rem;
        background-color: #424d83;
    }

    .sidenav__logo {
        margin-bottom: 3rem;
        border-bottom: 1px solid white;
        width: 100%;
        text-align: center;
        padding: 1rem 0rem;
    }
    
    .sidenav__logo img{
        height: 70px;
        width: 150px;    
    }
      
      @media only screen and (max-width: 850px) {
        .sidenav__logo {
          height: 60px;
          width: 130px;
        }
      }

    .sidenav__btn {
        width: 100%;
        height: 5rem;
        margin: 1rem 0rem;
        font-size: 1.5rem;
        background-color: rgba(255, 255, 255, 0.2);
        border: 1px solid rgba(255, 255, 255, 0.3);
        border-radius: 16px;
        box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
        backdrop-filter: blur(6.5px);
        -webkit-backdrop-filter: blur(6.5px);
    }

    .sidenav__btn:hover {
        background-color: rgba(255, 255, 255, 0.2);
    }

    .sidenav__btnactive {
        width: 100%;
        height: 5rem;
        margin: 1rem 0rem;
        font-size: 1.5rem;
        background-color: #5151f5;
        border-radius: 16px;
        box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
    }

    .sidenav__btnactive:hover {
        background-color: #5151f5;
    }

    .sidedata {
        width: 80%;
        padding: 0rem 1rem;
    }

`;
