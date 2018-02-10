FROM ubuntu

RUN apt-get update
RUN apt-get install -y openjdk-8-jdk
RUN apt-get install -y rsyslog
RUN apt-get install -y openssh-server

# get useful packages

RUN apt-get install -y curl sudo unzip
RUN apt-get install -y vim

# get your packages
RUN apt-get install -y build-essential gcc g++ unzip

# setup sshd

RUN mkdir /var/run/sshd

RUN echo 'root:root' | chpasswd

RUN sed -i 's/#PermitRootLogin.*/PermitRootLogin no/' /etc/ssh/sshd_config
RUN sed -i 's/#RSAAuthentication.*/RSAAuthentication yes/' /etc/ssh/sshd_config
RUN sed -i 's/#PasswordAuthentication.*/PasswordAuthentication no/' /etc/ssh/sshd_config
RUN sed -i 's/#SyslogFacility.*/SyslogFacility AUTH/' /etc/ssh/sshd_config
RUN sed -i 's/SyslogFacility.*/SyslogFacility AUTHPRIV/' /etc/ssh/sshd_config
RUN sed -i 's/#LogLevel.*/LogLevel INFO/' /etc/ssh/sshd_config
RUN sed -i 's/LogLevel.*/LogLevel INFO/' /etc/ssh/sshd_config
RUN sed -i 's/UsePAM yes/UsePAM no/' /etc/ssh/sshd_config

#EXPOSE 22

RUN groupadd -g 1000 jenkins
RUN useradd jenkins -d /home/jenkins -u 1000 -g 1000 -s /bin/bash
RUN echo 'jenkins:jenkins' | chpasswd
RUN mkdir -p /home/jenkins
RUN chmod -R a+w /home/jenkins
RUN chown -R jenkins:jenkins /home/jenkins

# for workspace 
# -v option in dockerrun.sh have this location attached to external directory.
RUN mkdir -p /var/lib/jenkins


# Install SSH configuration
# (Should allow master's SSH request.)
ADD ssh-files /root/.ssh
RUN chmod 0700 /root
RUN chmod 0600 /root/.ssh/id_rsa
RUN chmod 0644 /root/.ssh/id_rsa.pub
RUN chmod 0600 /root/.ssh/authorized_keys
RUN chmod 0700 /root/.ssh

ADD ssh-files /home/jenkins/.ssh
RUN chown -R jenkins:jenkins /home/jenkins/.ssh
RUN chmod 0700 /home/jenkins
RUN chmod 0600 /home/jenkins/.ssh/id_rsa
RUN chmod 0600 /home/jenkins/.ssh/authorized_keys
RUN chmod 0644 /home/jenkins/.ssh/id_rsa.pub
RUN chmod 0700 /home/jenkins/.ssh

# RUN chown -R jenkins:jenkins /home/jenkins
# RUN usermod -G wheel jenkins

CMD    /usr/sbin/rsyslogd
CMD    /usr/sbin/sshd -D



