import { useState, useEffect } from 'react';
import JobListing from './JobListing'

const JobListings = ({ isHomePage = false}) => {
  //  const jobListings = isHomePage? jobs.slice(0,3) : jobs;
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJobs = async () => {
      const apiUrl = isHomePage? "/api/jobs?_limit=3"
      :"/api/jobs"
      try {
        const res = await fetch(apiUrl);
        const data = await res.json();
        setJobs(data);
      } catch (error) {
        console.log('Error fetching Data', error);
      } finally {
        setLoading(false);
      }
    }

    fetchJobs();
  },[])

  return (
    <>
    {/* <!-- Browse Jobs --> */}
    <section className="bg-blue-50 px-4 py-10">
      <div className="container-xl lg:container m-auto">
        <h2 className="text-3xl font-bold text-indigo-500 mb-6 text-center">
          {isHomePage? 'Recent Jobs' : 'Browse Jobs' }
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {loading? (<h2>Loading...</h2>):(jobs.map((job) => (
                <JobListing key={job.id} job={job} />
            )))}
          
          
        </div>
      </div>
    </section></>
  )
}

export default JobListings