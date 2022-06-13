import styled from "styled-components";

/* styled component */
const LoadingWrap = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: 0.7;
    /* background: rgb(241, 241, 241, 0.6); */

    .loading-bar {
        position: absolute;
        width: 80px;
        height: 80px;
        top: calc(50% - 40px);
        left: calc(50% - 40px);
        border: 6px solid #bceffd;
        border-radius: 50%;
        border-top: 6px solid #3498db;
        -webkit-animation: spin 1s linear infinite;
        animation: spin 1s linear infinite;
        z-index:2002;
    }
    .loading-text {
        position: absolute;
        top: calc(50% - 12px);
        left: calc(50% - 27px);
        font-size: 0.85rem;
    }

        
    @-webkit-keyframes spin {
        0% { -webkit-transform: rotate(0deg); }
        100% { -webkit-transform: rotate(360deg); }
    }

    @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }

    @media screen and (max-width: 768px) {
        .calendar-list > .list-title > li {
            padding: 10px 10px;
            height: 40px;
        }
        .calendar-list > .list-item > li {
            padding: 30px 1px 5px 1px;
            min-height: 150px;
        }
        .calendar-todo-item {
            height: 20px;
        }
        .calendar-num {
            top: 4px;
            left: 8px;
        }
        .now-date::before {
            width: 24px;
            height: 24px;
        }
    }
    @media screen and (max-width: 480px) {
        .calendar-header {
            justify-content: flex-start;
        }
        .calendar-list > .list-title > li {
            padding: 8px 10px;
            height: 33px;
        }
        .calendar-list > .list-item > li {
            padding: 28px 1px 5px 1px;
            min-height: 148px;
        }
        .calendar-todo-item {
            height: 20px;
        }
        .now-date::before {
            width: 21px;
            height: 21px;
        }
    }
`

const Loading = () => {
    return (
        <LoadingWrap>
            <div className="loading-bar"></div>
            <div className="loading-text">Loading...</div>
        </LoadingWrap>
    )
}

export default Loading;