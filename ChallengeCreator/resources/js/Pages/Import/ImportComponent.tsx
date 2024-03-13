import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import Dropzone from 'react-dropzone';

type FormInputs = {
  file: FileList;
};

export default function DropzoneField() {
  const form = useForm<FormInputs>();

  const onSubmit: SubmitHandler<FormInputs> = (data) => {
    console.log(data);
  };

  return (
    <div>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <Controller
          control={form.control}
          name="file"
          rules={{
            required: { value: true, message: 'This field is required' },
          }}
          render={({ field: { onChange, onBlur }, fieldState }) => (
            <Dropzone
              noClick
              onDrop={(acceptedFiles) => {
                form.setValue('file', acceptedFiles as unknown as FileList, {
                  shouldValidate: true,
                });
              }}
            >
              {({
                getRootProps,
                getInputProps,
                open,
                isDragActive,
                acceptedFiles,
              }) => (
                <div>
                  <div
                    style={{
                      borderStyle: 'dashed',
                      backgroundColor: isDragActive ? `#808080` : 'transparent',
                    }}
                    {...getRootProps()}
                  >
                    <input
                      {...getInputProps({
                        id: 'spreadsheet',
                        onChange,
                        onBlur,
                      })}
                    />

                    <p>
                      <button type="button" onClick={open}>
                        Choose a file
                      </button>{' '}
                      or drag and drop
                    </p>

                    {acceptedFiles.length
                      ? acceptedFiles[0].name
                      : 'No file selected.'}

                    <div>
                      {fieldState.error && (
                        <span role="alert">{fieldState.error.message}</span>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </Dropzone>
          )}
        />

        <button>Submit</button>
      </form>
    </div>
  );
}