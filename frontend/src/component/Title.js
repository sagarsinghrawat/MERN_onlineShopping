import React from 'react'
import { Helmet } from 'react-helmet'

const Title = ({ title, description, keyword }) => {
    return (
        <Helmet>
            <title>{title}</title>
            <meta name='description' content={description}></meta>
            <meta name='keyword' content={keyword}></meta>
        </Helmet>
    )
}

Title.defaultProps = {
    title: "Online Shopping",
    description: "We sell the best products for cheap",
    keyword: "Any Products"
}

export default Title
