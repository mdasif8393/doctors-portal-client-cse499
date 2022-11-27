import { useQuery } from '@tanstack/react-query';
import React from 'react';
import Loading from '../Shared/Loading';
import UserRow from './UserRow';

const Users = () => {
    const {data : users, isLoading, refetch} = useQuery(['users'], ()=> fetch('http://localhost:5000/user', {
        method: 'GET',
        headers: {
            authorization: `Bearer ${localStorage.getItem('accessToken')}` 
        }
    }).then(res => res.json()))

    if(isLoading){
        return <Loading></Loading>
    }
    return (
        <div>
            <h1>All users: {users.length}</h1>
            <div className="overflow-x-auto">
  <table className="table w-full">

    <thead>
      <tr>
        <th></th>
        <th>Name</th>
        <th>Job</th>
        <th>Favorite Color</th>
      </tr>
    </thead>
    <tbody>
     {
        users.map(user => <UserRow user={user} refetch={refetch} key={user._id}></UserRow>)
     }
    </tbody>
  </table>
</div>
        </div>
    );
};

export default Users;