import React from "react";
import { toDate } from "./utils";

function RepoItem({ repo }: any) {
    const {
        name,
        owner,
        html_url,
        forks,
        watchers,
        stargazers_count,
        updated_at,
    } = repo;
    return (
        <div className="container-md d-flex jc-sb">
            <div className="d-flex">
                <div className="container-sm d-flex ai-c">
                    <a href={owner.html_url} target="_blank" rel="noreferrer">
                        <img
                            src={owner.avatar_url}
                            style={{ width: "36px", height: "36px" }}
                            alt="avatar"
                        />
                    </a>
                </div>
                <div className="container-sm">
                    <p>
                        Repo:&nbsp;
                        <a
                            href={html_url}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            {name}
                        </a>
                    </p>
                    <p>
                        By:&nbsp;
                        <a
                            href={owner.html_url}
                            target="_blank"
                            rel="noreferrer"
                        >
                            {owner.login}
                        </a>
                    </p>
                    <p>Updated at {toDate(updated_at)}</p>
                </div>
            </div>

            <div className="d-flex">
                <div className="container-sm">Forks: {forks}</div>
                <div className="container-sm">Watchers: {watchers}</div>
                <div className="container-sm">Stars: {stargazers_count}</div>
            </div>
        </div>
    );
}

export default RepoItem;
