import styled from "styled-components";
import qs from 'qs';
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const PaginationBlock = styled.div`
    width: 320px;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 3rem;
`;
const PageNumber = styled.div``;

type BuildLinkProps = {
    username: string;
    page: number;
}

const BuildLink = ({ username, page }:BuildLinkProps) => {
    const query = qs.stringify({ page });
    return username ? `/${username}?${query}` : `/?${query}`;
};

type PaginationProps = {
    page: number;
    lastPage: number;
}
const Pagination = ({ page, lastPage }:PaginationProps) => {
    const prevFlag = page === 1? true : false;
    const nextFlag = page === lastPage? true : false;
    return (
        <PaginationBlock>
            {page === 1 ? (
                <Button disabled={prevFlag}>이전</Button>
            ):(
                <Link  to={BuildLink({ username: 'table', page: page-1 })} className="btn btn-primary">이전</Link>
            )}
            <PageNumber>{page}</PageNumber>
            {page === lastPage ? (
                <Button disabled={nextFlag}>다음</Button>
            ):(
                <Link  to={BuildLink({ username: 'table', page: page+1 })} className="btn btn-primary">다음</Link>
            )}
            
        </PaginationBlock>
    );
};

export default Pagination;