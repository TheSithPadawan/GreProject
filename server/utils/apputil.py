import datetime

class apputil():

    @classmethod
    def get_time_difference(self, target_time):
        # not implmented 
        current_time = datetime.datetime.now()
        diff = current_time - datetime.datetime.now()
        print(diff)

    @classmethod
    def compare(self, correct_answer, user_answer):
        ans1 = correct_answer.answer1
        ans2 = correct_answer.answer2

        user1 = user_answer[0].answer_id
        user2 = user_answer[1].answer_id

        if((ans1 == user1) and (ans2 == user2)):
            return "correct"
        if((ans1 == user2) and (ans2 == user1)):
            return "correct"            
        return "incorrect"

        