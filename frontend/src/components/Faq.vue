<template>
    <div>
        <b-jumbotron header="Các câu hỏi thường gặp" class="w-75 m-auto">
            <b-img thumbnail fluid src="@/assets/book.png" alt="Logo"></b-img>
            
            <hr>

            <p v-for="(faq, index) in faqs" v-bind:key="index">
                {{ faq.question }} <br/> {{ faq.answer }}
            </p>
        </b-jumbotron>
    </div>
</template>

<script>
    export default {
        name: 'Faq',
        data: function() {
            return {
                faqs: [
                    {
                        question: 'Câu hỏi: Website này là gì?',
                        answer: 'Trả lời: Website này tổng hợp các kỹ năng sống cho trẻ em.\
                        Phụ huynh có thể tham khảo các bài viết trong đây để truyền lại cho con cháu của mình.'
                    },
                    {
                        question: 'Câu hỏi: Website này do ai tạo ra? Lý do?',
                        answer: 'Trả lời: Website này do một sinh viên của trường\
                        Đại học Công nghệ thông tin tạo ra để phục vụ cho đồ án của mình.\
                        Nội dung trong website này chỉ nên để tham khảo không nên thực hành ngoài đời.'
                    },
                    {
                        question: 'Câu hỏi: Frontend? Backend?',
                        answer: 'Trả lời: Vue.js, Node.js và PostreSQL'
                    },
                    {
                        question: 'Câu hỏi: Lý do lại chọn làm website này?',
                        answer: 'Trả lời: Vì muốn làm fullstack. ¯\\_(ツ)_/¯'
                    }
                ]
            };
        }
    }
</script>

<style scoped>

</style>