import React, { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'

import Table from '../../components/Table'
import Spinner from '../../components/Spinner'
import InformationAlert from '../../components/InformationAlert'
import { ISubmission } from '../../interfaces'
import Sidebar from '../../components/Sidebar'
import Pagination from '../../components/Pagination'


async function fetchSubmissions (/*{ pageIndex }*/) {
    const baseUrl = 'http://localhost'
    const url = new URL('/api/submissions', baseUrl)
    //const urlParams = url.searchParams
  
    //if (pageIndex) urlParams.set('page', pageIndex)
  

    const headers = {
      Authorization: 'Bearer ' + localStorage.getItem('token')
    }
  
    const response = await axios.get(url.toString(), {
      headers
    })

    //const response = await axios.get(url.toString())
  
    return response.data
  }

  function useSubmissions (/*{ pageIndex }*/): ({
    data: ISubmission[]
    isLoading: boolean
    // total: number
    // totalPages: number
    // perPage: number
    // currentPage: number
    // hasPreviousPage: boolean
    // hasNextPage: boolean
  }) {
    const {
      data: submissionsData,
      isLoading
    } = useQuery(['getSubmissions'/*,  pageIndex*/], async () => await fetchSubmissions(/*{ pageIndex }*/))
  
    const data = submissionsData ?? []
    //const pagination = submissionsData?.pagination ?? {}
    // const { total, totalPages, perPage, currentPage, links = {} } = pagination
    // const hasPreviousPage = links.previous
    // const hasNextPage = links.next
  
    return {
      data,
      isLoading,
      // total,
      // totalPages,
      // perPage,
      // currentPage,
      // hasPreviousPage,
      // hasNextPage
    }
  }

  // const initialSubmissionsPaginationState = {
  //   pageIndex: 1
  // }
  
  // const submissionsPaginationReducer = (state: { pageIndex: number }, action: { type: any }) => {
  //   switch (action.type) {
  //     case 'PREV_PAGE':
  //       return { ...state, pageIndex: state.pageIndex - 1 }
  //     case 'NEXT_PAGE':
  //       return { ...state, pageIndex: state.pageIndex + 1 }
  //     default:
  //       return state
  //   }
  // }

  const DoctorTable = (): JSX.Element => {
    //const [{ pageIndex }, dispatch] = React.useReducer(submissionsPaginationReducer, initialSubmissionsPaginationState)
    const {
      data: submissions,
      isLoading,
      // total,
      // perPage,
      // currentPage,
      // hasPreviousPage,
      // hasNextPage
    } = useSubmissions(/*{ pageIndex }*/)
  
    // const userIsLogged = false
    // const handlePreviousPage = () => dispatch({ type: 'PREV_PAGE' })
    // const handleNextPage = () => dispatch({ type: 'NEXT_PAGE' })

    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage, setPostsPerPage] = useState(15);
   
    const lastPostIndex = currentPage * postsPerPage;
    const firstPostIndex = lastPostIndex - postsPerPage;
    const currentPosts = submissions.slice(firstPostIndex, lastPostIndex);
  
    const renderTable = (): JSX.Element => {
      if (isLoading) {
        return (
          <div className='mt-8 self-center'>
            <Spinner />
          </div>
        )
      }
  
      if (submissions.length === 0) {
        const text = 'No submissions found'
        return (
          <div className='mt-8'>
            <InformationAlert>{text}</InformationAlert>
          </div>
        )
      }
  
      return (
        <>
        <Table data={currentPosts}></Table>
        <Pagination
                totalPosts={submissions.length}
                postsPerPage={postsPerPage}
                setCurrentPage={setCurrentPage}
                currentPage={currentPage}
        />
        </>
      )
    }
  
    return (
      <Sidebar>
        {renderTable()}
      </Sidebar>
      )
  }
  
  export default DoctorTable
  