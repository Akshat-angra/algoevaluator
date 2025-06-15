import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Plus, Trash2, FileText } from 'lucide-react';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useUser } from '@clerk/nextjs';
import { toast } from 'sonner';

export default function ResumeGenerator() {
    const { user } = useUser();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        name: user?.fullName || '',
        email: user?.emailAddresses[0]?.emailAddress || '',
        skills: [''],
        experience: ''
    });

    const handleInputChange = (e, field, index = null) => {
        const { value } = e.target;

        if (field === 'skills') {
            const newSkills = [...formData.skills];
            newSkills[index] = value;
            setFormData(prev => ({ ...prev, skills: newSkills }));
        } else {
            setFormData(prev => ({ 
                ...prev, 
                [field]: value 
            }));
        }
    };

    const addSkill = () => {
        setFormData(prev => ({ 
            ...prev, 
            skills: [...prev.skills, ''] 
        }));
    };

    const removeSkill = (index) => {
        const newSkills = formData.skills.filter((_, i) => i !== index);
        setFormData(prev => ({ ...prev, skills: newSkills }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validation
        if (!formData.name || !formData.email || 
            formData.skills.some(skill => !skill.trim()) || 
            !formData.experience.trim()) {
            toast.error('Please fill all fields');
            return;
        }

        setLoading(true);

        try {
            const response = await fetch('/api/resume', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    ...formData,
                    // Trim and filter out empty skills
                    skills: formData.skills.map(skill => skill.trim()).filter(Boolean)
                })
            });

            const result = await response.json();

            if (response.ok) {
                toast.success('Resume generated successfully!');
                // Optional: Reset form or navigate
            } else {
                toast.error(result.error || 'Failed to generate resume');
            }
        } catch (error) {
            console.error('Submission error:', error);
            toast.error('Failed to generate resume');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen relative flex items-center justify-center p-4 overflow-hidden">
            {/* Background Image */}
            <div 
                className="absolute inset-0 bg-cover bg-center opacity-10 z-0"
                style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100%25' height='100%25' viewBox='0 0 1600 800' preserveAspectRatio='none' style='transform:rotate(0deg)'%3E%3Crect width='1600' height='800' fill='%23f3f4f6'/%3E%3Cdefs%3E%3Cradialg radient id='a' cx='0' cy='0' r='100%25' gradientTransform='translate(0.5,0.5)'%3E%3Cstop offset='0' stop-color='%23f3f4f6'/%3E%3Cstop offset='1' stop-color='%2393c5fd'/%3E%3C/radialgradient%3E%3C/defs%3E%3Crect width='1600' height='800' fill='url(%23a)' opacity='0.77'/%3E%3Cpath fill='%23e0e7ff' opacity='0.53' d='M486 705.8c-109.3-21.8-223.4-32.2-335.3-19.4C99.5 692.1 49 703 0 719.8V800h843.8c-115.9-33.2-230.8-68.1-347.6-92.2C492.8 707.1 489.4 706.5 486 705.8z'/%3E%3Cpath fill='%23cbd5f0' opacity='0.66' d='M1600 0H0v719.8C363.1 671 1027.8 660.8 1600 660.8V0z'/%3E%3C/svg%3E")`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                }}
            />

            {/* Form Container - Elevated with z-index */}
            <Card className="w-full max-w-2xl shadow-2xl relative z-10 bg-white/90 backdrop-blur-sm">
                <CardHeader>
                    <CardTitle className="flex items-center text-3xl font-bold text-gray-800">
                        <FileText className="mr-3 text-blue-600" />
                        AI Resume Generator
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Personal Information */}
                        <div className="grid md:grid-cols-2 gap-4">
                            <div>
                                <Label>Full Name</Label>
                                <Input
                                    name="name"
                                    value={formData.name}
                                    onChange={(e) => handleInputChange(e, 'name')}
                                    placeholder="John Doe"
                                    required
                                />
                            </div>
                            <div>
                                <Label>Email</Label>
                                <Input
                                    name="email"
                                    type="email"
                                    value={formData.email}
                                    onChange={(e) => handleInputChange(e, 'email')}
                                    placeholder="john.doe@example.com"
                                    required
                                />
                            </div>
                        </div>

                        {/* Skills */}
                        <div>
                            <div className="flex justify-between items-center mb-4">
                                <Label className="text-lg">Skills</Label>
                                <Button 
                                    type="button" 
                                    variant="outline" 
                                    size="sm"
                                    onClick={addSkill}
                                >
                                    <Plus className="mr-2" /> Add Skill
                                </Button>
                            </div>
                            {formData.skills.map((skill, index) => (
                                <div key={index} className="flex items-center space-x-2 mb-2">
                                    <Input
                                        value={skill}
                                        onChange={(e) => handleInputChange(e, 'skills', index)}
                                        placeholder="e.g., React, Python, Machine Learning"
                                        required
                                    />
                                    {formData.skills.length > 1 && (
                                        <Button 
                                            type="button" 
                                            variant="destructive" 
                                            size="icon"
                                            onClick={() => removeSkill(index)}
                                        >
                                            <Trash2 />
                                        </Button>
                                    )}
                                </div>
                            ))}
                        </div>

                        {/* Professional Experience */}
                        <div>
                            <Label>Professional Experience</Label>
                            <Textarea
                                name="experience"
                                value={formData.experience}
                                onChange={(e) => handleInputChange(e, 'experience')}
                                placeholder="Provide a brief overview of your professional background, key achievements, and career highlights"
                                className="min-h-[150px]"
                                required
                            />
                        </div>

                        {/* Submit Button */}
                        <div className="text-center">
                            <Button 
                                type="submit" 
                                className="w-full md:w-auto px-12 py-3 text-lg"
                                disabled={loading}
                            >
                                {loading ? 'Generating...' : 'Generate Resume'}
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}
