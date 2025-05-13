import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { z } from 'zod';

// Zod schemas for role-specific data
const studentSchema = z.object({
  gender: z.string(),
  formLevel: z.string(),
  stream: z.string(),
  subjectsTaken: z.array(z.string()),
  hostelName: z.string().optional(),
  guardianContact: z.string().optional(),
});

const teacherSchema = z.object({
  gender: z.string(),
  subjectSpeciality: z.string(),
  department: z.string(),
  isClassTeacher: z.boolean(),
  assignedClass: z.string().optional(),
});

const adminSchema = z.object({
  gender: z.string(),
  position: z.string(),
});

const combinedSchema = z.object({
  fullName: z.string(),
  registrationNumber: z.string(),
  password: z.string().min(6),
  role: z.enum(['student', 'teacher', 'admin', 'admin_teacher']),
  student: studentSchema.optional(),
  teacher: teacherSchema.optional(),
  admin: adminSchema.optional(),
});

const userCreationForm = () => {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(combinedSchema),
    defaultValues: {
      teacher: { isClassTeacher: false },
    },
  });

  const selectedRole = watch('role');
  const isClassTeacher = watch('teacher?.isClassTeacher');

  const [formLevels, setFormLevels] = useState([]);
  const [streams, setStreams] = useState([]);
  const [classes, setClasses] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [departments, setDepartments] = useState([]);

  useEffect(() => {
    axios.get('/api/form-levels').then((res) => setFormLevels(res.data));
    axios.get('/api/subjects').then((res) => setSubjects(res.data));
    axios.get('/api/departments').then((res) => setDepartments(res.data));
    axios.get('/api/classes').then((res) => setClasses(res.data));
  }, []);

  useEffect(() => {
    const formLevel = watch('student?.formLevel');
    if (formLevel) {
      axios.get(`/api/streams?formLevel=${formLevel}`).then((res) => setStreams(res.data));
    }
  }, [watch('student?.formLevel')]);

  const onSubmit = (data) => {
    console.log('Form submitted:', data);
    // Submit to backend
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="p-6 bg-white rounded shadow-md space-y-4">
      {/* Basic fields */}
      <div>
        <label className="block">Full Name</label>
        <input {...register('fullName')} className="border p-2 w-full" />
        {errors.fullName && <p className="text-red-500">{errors.fullName.message}</p>}
      </div>

      <div>
        <label className="block">Registration Number</label>
        <input {...register('registrationNumber')} className="border p-2 w-full" />
        {errors.registrationNumber && <p className="text-red-500">{errors.registrationNumber.message}</p>}
      </div>

      <div>
        <label className="block">Password</label>
        <input type="password" {...register('password')} className="border p-2 w-full" />
        {errors.password && <p className="text-red-500">{errors.password.message}</p>}
      </div>

      <div>
        <label className="block">Role</label>
        <select {...register('role')} className="border p-2 w-full">
          <option value="">Select role</option>
          <option value="student">Student</option>
          <option value="teacher">Teacher</option>
          <option value="admin">Admin</option>
          <option value="admin_teacher">Admin + Teacher</option>
        </select>
        {errors.role && <p className="text-red-500">{errors.role.message}</p>}
      </div>

            {/* STUDENT Fields */}
            {selectedRole === 'student' && (
        <>
          <div>
            <label className="block">Gender</label>
            <select {...register('student.gender')} className="border p-2 w-full">
              <option value="">Select gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </div>

          <div>
            <label className="block">Form Level</label>
            <select {...register('student.formLevel')} className="border p-2 w-full">
              <option value="">Select form level</option>
              {formLevels.map((level) => (
                <option key={level} value={level}>{level}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block">Stream</label>
            <select {...register('student.stream')} className="border p-2 w-full">
              <option value="">Select stream</option>
              {streams.map((stream) => (
                <option key={stream} value={stream}>{stream}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block">Subjects Taken</label>
            <select {...register('student.subjectsTaken')} multiple className="border p-2 w-full">
              {subjects.map((subj) => (
                <option key={subj} value={subj}>{subj}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block">Hostel Name (Optional)</label>
            <input {...register('student.hostelName')} className="border p-2 w-full" />
          </div>

          <div>
            <label className="block">Guardian Contact (Optional)</label>
            <input {...register('student.guardianContact')} className="border p-2 w-full" />
          </div>
        </>
      )}

      {/* TEACHER Fields */}
      {selectedRole === 'teacher' && (
        <>
          <div>
            <label className="block">Gender</label>
            <select {...register('teacher.gender')} className="border p-2 w-full">
              <option value="">Select gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </div>

          <div>
            <label className="block">Subject Speciality</label>
            <select {...register('teacher.subjectSpeciality')} className="border p-2 w-full">
              <option value="">Select subject</option>
              {subjects.map((subject) => (
                <option key={subject} value={subject}>{subject}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block">Department</label>
            <select {...register('teacher.department')} className="border p-2 w-full">
              <option value="">Select department</option>
              {departments.map((dept) => (
                <option key={dept} value={dept}>{dept}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="inline-flex items-center">
              <input type="checkbox" {...register('teacher.isClassTeacher')} className="mr-2" />
              Is Class Teacher
            </label>
          </div>

          {isClassTeacher && (
            <div>
              <label className="block">Assigned Class</label>
              <select {...register('teacher.assignedClass')} className="border p-2 w-full">
                <option value="">Select class</option>
                {classes.map((cls) => (
                  <option key={cls} value={cls}>{cls}</option>
                ))}
              </select>
            </div>
          )}
        </>
      )}

      {/* ADMIN Fields */}
      {selectedRole === 'admin' && (
        <>
          <div>
            <label className="block">Gender</label>
            <select {...register('admin.gender')} className="border p-2 w-full">
              <option value="">Select gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </div>

          <div>
            <label className="block">Position</label>
            <input {...register('admin.position')} className="border p-2 w-full" />
          </div>
        </>
      )}

      {/* ADMIN_TEACHER Fields */}
      {selectedRole === 'admin_teacher' && (
        <>
          {/* Admin part */}
          <div className="font-semibold">Admin Section</div>
          <div>
            <label className="block">Gender</label>
            <select {...register('admin.gender')} className="border p-2 w-full">
              <option value="">Select gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </div>

          <div>
            <label className="block">Position</label>
            <input {...register('admin.position')} className="border p-2 w-full" />
          </div>

          {/* Teacher part */}
          <div className="font-semibold mt-4">Teacher Section</div>
          <div>
            <label className="block">Subject Speciality</label>
            <select {...register('teacher.subjectSpeciality')} className="border p-2 w-full">
              <option value="">Select subject</option>
              {subjects.map((subject) => (
                <option key={subject} value={subject}>{subject}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block">Department</label>
            <select {...register('teacher.department')} className="border p-2 w-full">
              <option value="">Select department</option>
              {departments.map((dept) => (
                <option key={dept} value={dept}>{dept}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="inline-flex items-center">
              <input type="checkbox" {...register('teacher.isClassTeacher')} className="mr-2" />
              Is Class Teacher
            </label>
          </div>

          {isClassTeacher && (
            <div>
              <label className="block">Assigned Class</label>
              <select {...register('teacher.assignedClass')} className="border p-2 w-full">
                <option value="">Select class</option>
                {classes.map((cls) => (
                  <option key={cls} value={cls}>{cls}</option>
                ))}
              </select>
            </div>
          )}
        </>
      )}

            {/* Submit Button */}
            <div className="mt-4">
        <button
          type="submit"
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
        >
          Submit
        </button>
      </div>
    </form>
  );
};

export default userCreationForm;




 
