import React, { useState, useEffect } from "react";
import API from "../../utils/api";
import { useParams, useNavigate } from "react-router-dom";

const SearchComponent = ({ searchType, searchQuery }) => {
    const navigate = useNavigate();
    const [searchResults, setSearchResults] = useState([]);
    useEffect(() => {
        const fetchSearchResults = async () => {
            if (!searchQuery) {
                setSearchResults([]);  
                return;
            }

            try {
                let url = ``; 
                let params = {};

                if (searchType === "devices") {
                    url = `/devices`; 
                    params.search_name = searchQuery; 
                } else if (searchType === "alerts") {
                    url = `/alerts`; 
                    params.search_message = searchQuery; 
                }

                const response = await API.get(url, { params });
                setSearchResults(response.data);
            } catch (error) {
                console.error("Error fetching search results:", error);
            }
        };

        fetchSearchResults();
    }, [searchQuery, searchType]);

    return (
        <div>
            {searchQuery && (
                <div className="search-results">
                    <h3>Search Results</h3>
                    {searchType === "devices" ? (
                        <ul>
                            {searchResults.map(device => (
                                <li key={device.id} onClick={() => navigate(`/device/${device.id}`, { state: { device } })}>{device.device_name} </li>
                            ))}
                        </ul>
                    ) : (
                        <ul>
                            {searchResults.map(alert => (
                                <li key={alert.id}>{alert.message}</li>
                            ))}
                        </ul>
                    )}
                </div>
            )}
        </div>
    );
};

export default SearchComponent;
