// app/components/CandidateForm.jsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { X } from 'lucide-react';

export default function CandidateForm({ candidate = null }) {
    const router = useRouter();
    const isEditing = !!candidate;

    const [formData, setFormData] = useState({
        name: candidate?.name || '',
        email: candidate?.email || '',
        position: candidate?.position || '',
        experience: candidate?.experience || 0,
        status: candidate?.status || 'applied',
        skills: candidate?.skills || []
    });

    const [skillInput, setSkillInput] = useState('');
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const addSkill = () => {
        if (skillInput.trim() && !formData.skills.includes(skillInput.trim())) {
            setFormData(prev => ({
                ...prev,
                skills: [...prev.skills, skillInput.trim()]
            }));
            setSkillInput('');
        }
    };

    const removeSkill = (skillToRemove) => {
        setFormData(prev => ({
            ...prev,
            skills: prev.skills.filter(skill => skill !== skillToRemove)
        }));
    };

    const validateForm = () => {
        const newErrors = {};

        if (!formData.name.trim()) {
            newErrors.name = 'Name is required';
        }

        if (!formData.email.trim()) {
            newErrors.email = 'Email is required';
        } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
            newErrors.email = 'Email is invalid';
        }

        if (!formData.position.trim()) {
            newErrors.position = 'Position is required';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        setIsSubmitting(true);

        try {
            const url = isEditing
                ? `/api/candidates/${candidate._id}`
                : '/api/candidates';

            const method = isEditing ? 'PUT' : 'POST';

            const response = await fetch(url, {
                method,
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Something went wrong');
            }

            router.push('/candidates');
        } catch (error) {
            alert(`Error: ${error.message}`);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                    Name
                </label>
                <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className={`mt-1 block w-full rounded-md border ${errors.name ? 'border-red-500' : 'border-gray-300'} shadow-sm p-2.5 focus:border-indigo-500 focus:ring-indigo-500`}
                />
                {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
            </div>

            <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                    Email
                </label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`mt-1 block w-full rounded-md border ${errors.email ? 'border-red-500' : 'border-gray-300'} shadow-sm p-2.5 focus:border-indigo-500 focus:ring-indigo-500`}
                />
                {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
            </div>

            <div>
                <label htmlFor="position" className="block text-sm font-medium text-gray-700">
                    Position
                </label>
                <input
                    type="text"
                    id="position"
                    name="position"
                    value={formData.position}
                    onChange={handleChange}
                    className={`mt-1 block w-full rounded-md border ${errors.position ? 'border-red-500' : 'border-gray-300'} shadow-sm p-2.5 focus:border-indigo-500 focus:ring-indigo-500`}
                />
                {errors.position && <p className="mt-1 text-sm text-red-600">{errors.position}</p>}
            </div>

            <div>
                <label htmlFor="experience" className="block text-sm font-medium text-gray-700">
                    Experience (years)
                </label>
                <input
                    type="number"
                    id="experience"
                    name="experience"
                    min="0"
                    value={formData.experience}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm p-2.5 focus:border-indigo-500 focus:ring-indigo-500"
                />
            </div>

            <div>
                <label htmlFor="status" className="block text-sm font-medium text-gray-700">
                    Status
                </label>
                <select
                    id="status"
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm p-2.5 focus:border-indigo-500 focus:ring-indigo-500"
                >
                    <option value="applied">Applied</option>
                    <option value="screening">Screening</option>
                    <option value="interview">Interview</option>
                    <option value="offer">Offer</option>
                    <option value="rejected">Rejected</option>
                </select>
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700">
                    Skills
                </label>
                <div className="flex mt-1">
                    <input
                        type="text"
                        value={skillInput}
                        onChange={(e) => setSkillInput(e.target.value)}
                        className="block w-full rounded-l-md border border-gray-300 shadow-sm p-2.5 focus:border-indigo-500 focus:ring-indigo-500"
                        placeholder="Add a skill"
                        onKeyPress={(e) => {
                            if (e.key === 'Enter') {
                                e.preventDefault();
                                addSkill();
                            }
                        }}
                    />
                    <button
                        type="button"
                        onClick={addSkill}
                        className="bg-indigo-600 text-white px-4 py-2 rounded-r-md hover:bg-indigo-700"
                    >
                        Add
                    </button>
                </div>
                <div className="flex flex-wrap gap-2 mt-2">
                    {formData.skills.map((skill, index) => (
                        <div key={index} className="bg-indigo-100 text-indigo-800 px-2 py-1 rounded text-sm flex items-center">
                            {skill}
                            <button
                                type="button"
                                onClick={() => removeSkill(skill)}
                                className="ml-1 text-indigo-600 hover:text-indigo-800"
                            >
                                <X className="w-3 h-3" />
                            </button>
                        </div>
                    ))}
                </div>
            </div>

            <div className="flex justify-end space-x-3">
                <button
                    type="button"
                    onClick={() => router.push('/candidates')}
                    className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                >
                    Cancel
                </button>
                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-indigo-300"
                >
                    {isSubmitting ? 'Saving...' : isEditing ? 'Update Candidate' : 'Add Candidate'}
                </button>
            </div>
        </form>
    );
}