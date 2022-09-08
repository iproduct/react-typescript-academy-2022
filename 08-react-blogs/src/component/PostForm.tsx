import React, { BaseSyntheticEvent, FormEvent } from 'react';
import { Post, PostStatus } from '../model/posts';
import { IdType, Optional, PostListener } from '../model/shared-types';
import { useForm } from "react-hook-form";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import CancelIcon from '@mui/icons-material/Cancel';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";

import FormInputText from './FormInputText';


interface PostFormProps {
    post: Optional<Post>;
    onSubmitPost: PostListener;
}

type FormData = {
    id: number;
    title: string;
    content: string;
    tags: string;
    imageUrl: string;
    status: PostStatus;
    authorId: IdType;
};

const TAGS_PATTERN = /^\w{2,}([,\s]+\w{2,})*$/;

const schema = yup.object({
    id: yup.number().positive(),
    title: yup.string().required().min(2).max(40),
    content: yup.string().required().min(20).max(1024),
    tags: yup.string().required().matches(TAGS_PATTERN, 'tags should contain only letters, digits and spaces'),
    imageUrl: yup.string().required().url(),
    status: yup.number().min(1).max(2),
    authorId: yup.number().positive().required(),
}).required();

export default function PostForm({ post, onSubmitPost }: PostFormProps) {
    const { control, register, setValue, handleSubmit, reset, formState: { errors } } = useForm<FormData>({
        defaultValues: { ...post, tags: post?.tags.join(', ') },
        mode: 'onChange',
        resolver: yupResolver(schema),
    });

    const onSubmit = (data: FormData, event: BaseSyntheticEvent<object, any, any> | undefined) => {
        event?.preventDefault();
        const post = { ...data, tags: data.tags.split(/,\s*/) }
        console.log(post);
        onSubmitPost(post);
    }

    const onReset = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        console.log('RESETING FORM');
    }

    return (
        <Box
            component="form"
            sx={{
                backgroundColor: '#ddf',
                padding: '20px',
                '& .MuiTextField-root': { m: 1, width: 'calc(100% - 20px)' },
                '& .MuiButton-root': { m: 1, width: '25ch' },
            }}
            noValidate
            autoComplete="off"
            onSubmit={handleSubmit(onSubmit)} onReset={onReset}
        >
            <FormInputText name='id' label='ID' control={control} disabled size='small' />
            <FormInputText name='title' label='Title' control={control} error={errors.title?.message}
                rules={{ required: true, minLength: 2, maxLength: 40 }} />
            <FormInputText name='content' label='Content' control={control} error={errors.content?.message}
                rules={{ required: true, minLength: 20, maxLength: 1024 }} />
            <FormInputText name='tags' label='Tags' control={control} error={errors.tags?.message}
                rules={{ pattern: TAGS_PATTERN }} />
            <FormInputText name='imageUrl' label='Image URL' control={control} error={errors.imageUrl?.message}
                rules={{ required: true }} />
            <FormInputText name='authorId' label='Author ID' control={control} error={errors.authorId?.message}
                rules={{ required: true }} />
            <Button variant="contained" endIcon={<SendIcon />} type='submit'>
                Submit
            </Button>
            <Button variant="contained" endIcon={<CancelIcon />} color='warning' type='reset'>
                Reset
            </Button>
        </Box>
    );
}
