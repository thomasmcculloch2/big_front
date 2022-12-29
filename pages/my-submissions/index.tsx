
import React, { useState } from "react";
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'

import Table from '../../components/Table'
import Spinner from '../../components/Spinner'
import InformationAlert from '../../components/InformationAlert'
import { ISubmission } from '../../interfaces'
import Sidebar from '../../components/Sidebar'
import Pagination from "../../components/Pagination";
import { AuthContext } from "../../context";



async function fetchSubmissions () {
    const baseUrl = 'http://localhost'
    const url = new URL('/api/my-submissions', baseUrl)
  

    const headers = {
      Authorization: 'Bearer ' + localStorage.getItem('token') 
    }
  
    const response = await axios.get(url.toString(), {
      headers
    })

  
    return response.data
  }

  function useSubmissions (): ({
    data: ISubmission[]
    isLoading: boolean
  }) {
    const {
      data: submissionsData,
      isLoading
    } = useQuery(['getSubmissions'], async () => await fetchSubmissions())
  
    const data = submissionsData ?? []
  
    return {
      data,
      isLoading,
    }
  }

  const MySubmissions = (): JSX.Element => {
    const {
      data: submissions,
      isLoading,
    } = useSubmissions()

    

    const [fiteredSubmissions, setFilteredSubmissions] = React.useState(submissions)
    const onFilter = (filter: string) => {
      if (filter) {
        setFilteredSubmissions(submissions.filter((submission) => submission.status === filter));
      } else {
        setFilteredSubmissions(submissions);
      }
    }

    React.useEffect(() => {
      setFilteredSubmissions(submissions); // This is be executed when the state changes
  }, [submissions]);

    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage, setPostsPerPage] = useState(12);
   
    const lastPostIndex = currentPage * postsPerPage;
    const firstPostIndex = lastPostIndex - postsPerPage;
    const currentPosts = fiteredSubmissions.slice(firstPostIndex, lastPostIndex);
    const { role } = React.useContext(AuthContext);

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
          <select className='flex ml-auto' onChange={(e)=>onFilter(e.target.value)}>
            <option value="">All</option>
            {role === 'patient' && <option value="pending">Pending</option>}
            <option value="in_progress">In progreesss</option>
            <option value="done">Done</option>
          </select>
          <Table data={currentPosts}></Table>
          <Pagination
                totalPosts={fiteredSubmissions.length}
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

  export default MySubmissions
