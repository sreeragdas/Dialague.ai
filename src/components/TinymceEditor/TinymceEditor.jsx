import { Editor } from '@tinymce/tinymce-react';
import React, { useRef } from 'react';

const TinymceEditor = ({initialvalue}) => {

    const editorRef = useRef(null);

    return (
        <>
            <Editor
                apiKey="59tfa9du2nj9f2vknfej0bmxhctmfjh34keva1mouvizl8af"
                onInit={(evt, editor) => (editorRef.current = editor)}
                initialValue={initialvalue}
                init={{
                    height: 500,
                    plugins: [
                        "advlist autolink lists link image charmap print preview anchor",
                        "searchreplace visualblocks code fullscreen",
                        "insertdatetime media table paste code help wordcount",
                    ],
                    menu: {
                        tc: {
                            title: "Comments",
                            items:
                                "addcomment showcomments deleteallconversations",
                        },
                    },
                    menubar:
                        "file edit view insert format tools table tc help",
                    toolbar:
                        "undo redo | " +
                        "bold italic underline strikethrough backcolor | fontselect fontsizeselect formatselect | alignleft aligncenter " +
                        "alignright alignjustify | bullist numlist outdent indent | " +
                        "removeformat | help",
                    autosave_ask_before_unload: true,
                    autosave_interval: "30s",
                    autosave_prefix: "{path}{query}-{id}-",
                    autosave_restore_when_empty: false,
                    autosave_retention: "2m",
                    image_advtab: true,
                    link_list: [
                        {
                            title: "My page 1",
                            value: "https://www.tiny.cloud",
                        },
                        {
                            title: "My page 2",
                            value: "http://www.moxiecode.com",
                        },
                    ],
                    image_list: [
                        {
                            title: "My page 1",
                            value: "https://www.tiny.cloud",
                        },
                        {
                            title: "My page 2",
                            value: "http://www.moxiecode.com",
                        },
                    ],
                    image_class_list: [
                        { title: "None", value: "" },
                        { title: "Some class", value: "class-name" },
                    ],
                    content_style:
                        "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
                    templates: [
                        {
                            title: "New Table",
                            description: "creates a new table",
                            content:
                                '<div class="mceTmpl"><table width="98%%"  border="0" cellspacing="0" cellpadding="0"><tr><th scope="col"> </th><th scope="col"> </th></tr><tr><td> </td><td> </td></tr></table></div>',
                        },
                        {
                            title: "Starting my story",
                            description: "A cure for writers block",
                            content: "Once upon a time...",
                        },
                        {
                            title: "New list with dates",
                            description: "New List with dates",
                            content:
                                '<div class="mceTmpl"><span class="cdate">cdate</span><br /><span class="mdate">mdate</span><h2>My List</h2><ul><li></li><li></li></ul></div>',
                        },
                    ],
                    template_cdate_format:
                        "[Date Created (CDATE): %m/%d/%Y : %H:%M:%S]",
                    template_mdate_format:
                        "[Date Modified (MDATE): %m/%d/%Y : %H:%M:%S]",
                    image_caption: true,
                    quickbars_selection_toolbar:
                        "bold italic | quicklink h2 h3 blockquote quickimage quicktable",
                    noneditable_noneditable_class: "mceNonEditable",
                    toolbar_mode: "sliding",
                    spellchecker_ignore_list: ["Ephox", "Moxiecode"],
                    tinycomments_mode: "embedded",
                }}
            />
        </>
    )
}

export default TinymceEditor
