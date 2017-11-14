import React, { Component } from 'react';
import PropTypes from 'prop-types';
import api from '../utils/api';

function SelectLanguage(props) {
  const languages = ['All', 'Javascript', 'Ruby', 'Java', 'CSS', 'Python'];
  return (
    <ul className="languages">
      {languages.map(function(lang) {
        return (
          <li
            style={lang === props.selectedLanguage ? { color: '#d0021b' } : null}
            key={lang}
            onClick={props.onSelect.bind(null, lang)}
          >
            {lang}
          </li>
        );
      }, this)}
    </ul>
  );
}

SelectLanguage.propTypes = {
  selectedLanguage: PropTypes.string,
  onSelect: PropTypes.func
};

class Popular extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedLanguage: 'All',
      repos: null
    };
    this.updateLanguage = this.updateLanguage.bind(this);
  }

  componentDidMount() {
    this.updateLanguage(this.state.selectedLanguage);
  }

  updateLanguage(lang) {
    this.setState(function() {
      return {
        selectedLanguage: lang,
        repos: null
      };
    });

    api.fetchPopularRepos(lang).then(
      function(repos) {
        this.setState(function() {
          return {
            repos: repos
          };
        });
      }.bind(this)
    );
  }

  render() {
    return (
      <div>
        <SelectLanguage selectedLanguage={this.state.selectedLanguage} onSelect={this.updateLanguage} />
      </div>
    );
  }
}

export default Popular;
