import { Button, Form, FormControl, FormField, FormItem, FormLabel, FormMessage, Input } from '@/components/ui'
import { register } from '@/State/Auth/Action';
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux';

function SignupForm() {
    const dispatch = useDispatch();
    const form = useForm({
        defaultValues: {
            fullName: "",
            email: "",
            password: "",
            confirmPassword: ""
        }
    })

    const onSubmit = (data) => {
        dispatch(register(data));
        console.log(data)
    }

    return (
        <div className='w-full'>
            <h1 className='text-xl font-bold text-center mb-4 text-white'>Create New Account</h1>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                    <FormField
                        control={form.control}
                        name="fullName"
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <Input 
                                        className='w-full p-3 text-white bg-transparent border border-gray-600'
                                        placeholder="Full Name" 
                                        {...field} 
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <Input 
                                        type="email"
                                        className='w-full p-3 text-white bg-transparent border border-gray-600'
                                        placeholder="Email" 
                                        {...field} 
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    
                    <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <Input 
                                        type="password"
                                        className='w-full p-3 text-white bg-transparent border border-gray-600'
                                        placeholder="Password" 
                                        {...field} 
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    
                    <FormField
                        control={form.control}
                        name="confirmPassword"
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <Input 
                                        type="password"
                                        className='w-full p-3 text-white bg-transparent border border-gray-600'
                                        placeholder="Confirm Password" 
                                        {...field} 
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    
                    <Button type='submit' className='w-full py-3'>
                        Sign Up
                    </Button>
                </form>
            </Form>
        </div>
    )
}

export default SignupForm