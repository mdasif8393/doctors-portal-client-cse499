import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import Loading from '../Shared/Loading';

const AddDoctor = () => {

    const { register, formState: { errors }, handleSubmit, reset } = useForm();

    //react query
    const { data: services, isLoading } = useQuery(['services'], () => fetch('http://localhost:5000/service').then(res => res.json()))
    if (isLoading) {
        return <Loading></Loading>;
    }




    /**
     * 3 ways to store images // Free open public storage is ok for practice project
     * 1. Third party storage
     * 2. Your own storage in your own server (file system)
     * 3. Database: Mongo DB
     * 
     * YUP: to validate file Search: Yup file validation for react hook form
     * 
     */
    const imageStorageKey = '938e64417beec945f2d726c4dc17db92';
    const onSubmit = async (data) => {
        const image = data?.image[0];
        const formData = new FormData();
        formData.append('image', image);
        const url = `https://api.imgbb.com/1/upload?key=${imageStorageKey}`;
        fetch(url, {
            method: 'POST',
            body: formData
        })
            .then(res => res.json())
            .then(result => {
                if (result?.success) {
                    const img = result?.data?.url;
                    const doctor = {
                        name: data.name,
                        degree: data.degree,
                        email: data.email,
                        specialty: data.specialty,
                        designation: data.designation,
                        address: data.address,
                        number: data.number,
                        time: data.time,
                        fee: data.fee,
                        img: img,
                    }
                    //send to your database
                    fetch("http://localhost:5000/doctor", {
                        method: 'POST',
                        headers: {
                            'content-type': 'application/json',
                            authorization: `Bearer ${localStorage.getItem('accessToken')}`
                        },
                        body: JSON.stringify(doctor)
                    })
                        .then(res => res.json())
                        .then(inserted => {
                            if (inserted.insertedId) {
                                toast.success("Doctor added successfully");
                                reset();
                            }
                            else {
                                toast.error("Failed to add doctor")
                            }
                        })
                }
            })
    };
    return (
        <div>
            <h2 className="text-2xl">Add a new Doctor</h2>
            <form onSubmit={handleSubmit(onSubmit)} className="text-gray-600">

                {/* Name */}
                <div className="form-control w-full max-w-xs">
                    <label className="label ">
                        <span className="label-text text-gray-600">Doctor's Name</span>
                    </label>

                    <input type="text" placeholder="Doctor's Name" className="input input-bordered w-full max-w-xs bg-white"
                        {...register("name", {
                            required: {
                                value: true,
                                message: 'Name is required'
                            }
                        })}
                    />

                    <label className="label">
                        {errors.name?.type === 'required' && <span className="label-text-alt text-red-500">{errors?.name?.message}</span>}
                    </label>
                </div>

                {/* Degree */}
                <div className="form-control w-full max-w-xs">
                    <label className="label ">
                        <span className="label-text text-gray-600">Doctor's Degree</span>
                    </label>

                    <input type="text" placeholder="Doctor's Degree" className="input input-bordered w-full max-w-xs bg-white"
                        {...register("degree", {
                            required: {
                                value: true,
                                message: 'Degree is required'
                            }
                        })}
                    />

                    <label className="label">
                        {errors.name?.type === 'required' && <span className="label-text-alt text-red-500">{errors?.name?.message}</span>}
                    </label>
                </div>

                {/* Specialty */}
                <div className="form-control w-full max-w-xs">
                    <label className="label ">
                        <span className="label-text text-gray-600">Doctor's Specialty</span>
                    </label>

                    <input type="text" placeholder="Doctor's Specialty" className="input input-bordered w-full max-w-xs bg-white"
                        {...register("specialty", {
                            required: {
                                value: true,
                                message: 'Specialty is required'
                            }
                        })}
                    />

                    <label className="label">
                        {errors.name?.type === 'required' && <span className="label-text-alt text-red-500">{errors?.name?.message}</span>}
                    </label>
                </div>

                {/* Designation */}
                <div className="form-control w-full max-w-xs">
                    <label className="label ">
                        <span className="label-text text-gray-600">Doctor's Designation</span>
                    </label>

                    <input type="text" placeholder="Doctor's Designation" className="input input-bordered w-full max-w-xs bg-white"
                        {...register("designation", {
                            required: {
                                value: true,
                                message: 'Designation is required'
                            }
                        })}
                    />

                    <label className="label">
                        {errors.name?.type === 'required' && <span className="label-text-alt text-red-500">{errors?.name?.message}</span>}
                    </label>
                </div>

                {/* Chamber Address */}
                <div className="form-control w-full max-w-xs">
                    <label className="label ">
                        <span className="label-text text-gray-600">Doctor's Chamber Address</span>
                    </label>

                    <input type="text" placeholder="Doctor's Chamber Address" className="input input-bordered w-full max-w-xs bg-white"
                        {...register("address", {
                            required: {
                                value: true,
                                message: 'Chamber address is required'
                            }
                        })}
                    />

                    <label className="label">
                        {errors.name?.type === 'required' && <span className="label-text-alt text-red-500">{errors?.name?.message}</span>}
                    </label>
                </div>

                {/* Contact Number */}
                <div className="form-control w-full max-w-xs">
                    <label className="label ">
                        <span className="label-text text-gray-600">Chamber's Contact Number</span>
                    </label>

                    <input type="text" placeholder="Chamber's Contact Number" className="input input-bordered w-full max-w-xs bg-white"
                        {...register("number", {
                            required: {
                                value: true,
                                message: 'Contact Number is required'
                            }
                        })}
                    />

                    <label className="label">
                        {errors.name?.type === 'required' && <span className="label-text-alt text-red-500">{errors?.name?.message}</span>}
                    </label>
                </div>

                {/* Visiting Hours */}
                <div className="form-control w-full max-w-xs">
                    <label className="label ">
                        <span className="label-text text-gray-600">Visiting Hours</span>
                    </label>

                    <input type="text" placeholder="Visiting Hours" className="input input-bordered w-full max-w-xs bg-white"
                        {...register("time", {
                            required: {
                                value: true,
                                message: 'Visiting Hour is required'
                            }
                        })}
                    />

                    <label className="label">
                        {errors.name?.type === 'required' && <span className="label-text-alt text-red-500">{errors?.name?.message}</span>}
                    </label>
                </div>

                {/* Doctor's Fee */}
                <div className="form-control w-full max-w-xs">
                    <label className="label ">
                        <span className="label-text text-gray-600">Doctor's Fee</span>
                    </label>

                    <input type="text" placeholder="Doctor's Fee" className="input input-bordered w-full max-w-xs bg-white"
                        {...register("fee", {
                            required: {
                                value: true,
                                message: 'Fee is required'
                            }
                        })}
                    />

                    <label className="label">
                        {errors.name?.type === 'required' && <span className="label-text-alt text-red-500">{errors?.name?.message}</span>}
                    </label>
                </div>

                <div className="form-control w-full max-w-xs">
                    <label className="label ">
                        <span className="label-text text-gray-600">Doctor's Photo</span>
                    </label>

                    <input type="file" placeholder="Your Name" className="input input-bordered w-full max-w-xs bg-white"
                        {...register("image", {
                            required: {
                                value: true,
                                message: 'Image is required'
                            }
                        })}
                    />

                    <label className="label">
                        {errors.name?.type === 'required' && <span className="label-text-alt text-red-500">{errors?.name?.message}</span>}
                    </label>
                </div>

                <br />
                <input className="btn w-full max-w-xs" type="submit" value="Add" />
            </form>
        </div>
    );
};

export default AddDoctor;