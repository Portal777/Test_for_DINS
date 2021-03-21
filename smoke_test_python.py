"""
testing https://jsonplaceholder.typicode.com

test for GET /posts?userId=<id>&title=<title>
"""

import requests
import unittest


class SmokeTest(unittest.TestCase):
    userId = 1
    title = "sunt aut facere repellat provident occaecati excepturi optio reprehenderit"

    response = requests.get(f"https://jsonplaceholder.typicode.com/posts?userId={userId}&title={title}")
    response_body = response.json()

    correct_status_code = 200
    correct_type_response = list
    correct_post_data_type = dict

    def test_server_response_code(self):
        self.assertEqual(self.response.status_code, self.correct_status_code)

    def test_content_type(self):
        self.assertEqual(self.response.headers['Content-Type'].split(' ')[0], "application/json;")

    def test_content_type_charset(self):
        self.assertEqual(self.response.headers['Content-Type'].split(' ')[1], "charset=utf-8")

    def test_response_data_type(self):
        self.assertEqual(type(self.response_body), self.correct_type_response)

    def test_post_data_type_in_the_response(self):
        if len(self.response_body) > 0:
            self.assertEqual(type(self.response_body[0]), self.correct_post_data_type)


if __name__ == '__main__':
    unittest.main()
