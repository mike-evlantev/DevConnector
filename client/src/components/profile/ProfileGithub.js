import React, { Fragment, useEffect } from "react";
import { connect } from "react-redux";
import { getGithubRepos } from "../../actions/profile";
import Spinner from "../layout/Spinner";

const ProfileGithub = ({ username, getGithubRepos, repos }) => {
  useEffect(() => {
    getGithubRepos(username);
    // eslint-disable-next-line
  }, [getGithubRepos]);
  return (
    <Fragment>
      {repos === null ? (
        <Spinner />
      ) : (
        <ul className="list-group list-group-flush">
          <li className="list-group-item">
            <h6 className="card-title text-center">Github Repos</h6>
            {repos.map(repo => (
              <div key={repo.id}>
                <span>
                  <a
                    href={repo.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {repo.name}
                  </a>
                </span>
              </div>
            ))}
          </li>
        </ul>
      )}
    </Fragment>
  );
};

const mapStateToProps = state => ({
  repos: state.profile.repos
});

export default connect(
  mapStateToProps,
  { getGithubRepos }
)(ProfileGithub);
