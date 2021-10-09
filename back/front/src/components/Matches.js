import React, {useState} from 'react';
import ReactPaginate from 'react-paginate';
import '../styles/Matches.css'

const Matches = ({matches}) => {
    const [currentPage, setCurrentPage] = useState(0);
    
    const PER_PAGE = 2;
    const pagesVisited = currentPage * PER_PAGE;

    const paginatedMatches = matches.slice(pagesVisited, pagesVisited + PER_PAGE).map(match => {
        return (
            <div key = {match._id} className = "match_container">
                <div>
                    <div className = "date">{new Date(match.date).toLocaleString('en-US', { weekday: 'long', day: 'numeric', month: 'long'})}</div> 
                </div>
                <div className = "teams_container">
                    <div className = "homeTeamName">{match.awayTeamName}</div>
                    <div className = "score">{match.score || "?"}</div>
                    <div className = "awayTeamName">{match.homeTeamName}</div>
                </div>
            </div>
        )
    })

    const onPageChange = ({selected}) => {
        setCurrentPage(selected);
    }


    return (
        <>
            {paginatedMatches}
            <div className = "pagination_block" style = {{display: paginatedMatches.length > 0 ? "block" : "none"}}>
                <ReactPaginate
                    previousLabel = {"←"}
                    nextLabel = {"→"}
                    pageCount = {Math.ceil(matches.length/PER_PAGE)}
                    onPageChange = {onPageChange}
                    containerClassName = {"pagination"}
                    previousLinkClassName = {"previous"}
                    nextLinkClassName = {"next"}
                    disabledClassName = {"disabled"}
                    activeClassName = {"active"}
                />
            </div>
        </>
    )
};

export default Matches;
