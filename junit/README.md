
Input Format:

testcasename\tresult\ttime\tmessage\tdescs

elements should not contain \t, " character.

result:  ok|error|fail|skip


Output Format

<?xml version="1.0" ?>
<testsuite name="" tests="count" errors="error-count" failures="fail-count" time="">
  <testcase classname="" name="<testcasename>" time="<time>"><error type="" message="<message>" time="<time>"></error></testcase>
  <testcase classname="" name="<testcasename>" time="<time>"><failure type="" message="<message>" time="<time>"></failure></testcase>
  <testcase classname="" name="<testcasename>" time="<time>"><skipped/></>    
  <system-out><![CDATA[sdtout!]]></system-out>
  <system-err><![CDATA[stderr!]]></system-err>
</testsuite>

