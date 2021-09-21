import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from './Searchbar.module.css';

class Searchbar extends Component {
    static propTypes = {
        onSubmit: PropTypes.func,
    };

    state = {
        query: '',
    }

    onInputChange = (e) => {
        this.setState({
          query: e.currentTarget.value.toLowerCase()
        });
      };

    onFormSubmit = (e) => {
        e.preventDefault();
        if (this.state.query.trim() === '') {
            return alert('Please enter something');
        }

        this.props.onSubmit(this.state.query);
        this.setState({ query: '' })
        

    }

    render () {
        return (
            <header className={styles.Searchbar}>
                <form className={styles.SearchForm} onSubmit={this.onFormSubmit}>
                    <button type="submit" className={styles.SearchForm_button}>
                        <span className={styles.SearchForm_button_label}>
                            Search
                        </span>
                    </button>

                    <input
                        className={styles.SearchForm_input}
                        type="text"
                        autoComplete="off"
                        autoFocus
                        placeholder="Search images and photos"
                        value={this.state.query}
                        onChange={this.onInputChange}
                        name="query"
                    />
                </form>
            </header>
        )
    }
}

export { Searchbar };